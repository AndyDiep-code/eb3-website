#!/usr/bin/env node

import { execFileSync } from 'node:child_process';

const sonarHost = process.env.SONAR_HOST;
const sonarToken = process.env.SONAR_TOKEN;
const projectKey = process.argv[2] ?? 'ai-proxy-web';

if (!sonarHost || !sonarToken) {
  console.error('SONAR_HOST and SONAR_TOKEN are required.');
  process.exit(1);
}

const metrics = [
  'duplicated_blocks',
  'duplicated_files',
  'duplicated_lines',
  'duplicated_lines_density',
  'new_duplicated_lines_density',
];

const url = new URL('/api/measures/component', sonarHost);
url.searchParams.set('component', projectKey);
url.searchParams.set('metricKeys', metrics.join(','));

let payload;
try {
  const response = execFileSync(
    'curl',
    ['-sS', '-u', `${sonarToken}:`, url.toString()],
    { encoding: 'utf8' },
  );
  payload = JSON.parse(response);
} catch (error) {
  console.error(`Sonar request failed: ${error instanceof Error ? error.message : String(error)}`);
  process.exit(1);
}

const mapped = Object.fromEntries(
  (payload.component?.measures ?? []).map((measure) => [measure.metric, measure.period?.value ?? measure.value ?? null]),
);

console.log(JSON.stringify({
  component: payload.component?.key ?? projectKey,
  duplicated_blocks: Number(mapped.duplicated_blocks ?? 0),
  duplicated_files: Number(mapped.duplicated_files ?? 0),
  duplicated_lines: Number(mapped.duplicated_lines ?? 0),
  duplicated_lines_density: Number(mapped.duplicated_lines_density ?? 0),
  new_duplicated_lines_density: Number(mapped.new_duplicated_lines_density ?? 0),
}, null, 2));
