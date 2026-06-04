#!/usr/bin/env node

import { execFileSync } from 'node:child_process';

const sonarHost = process.env.SONAR_HOST;
const sonarToken = process.env.SONAR_TOKEN;
const filePath = process.argv[2];

if (!sonarHost || !sonarToken) {
  console.error('SONAR_HOST and SONAR_TOKEN are required.');
  process.exit(1);
}

if (!filePath) {
  console.error('Usage: node .codex/skills/sonar-web-fix/scripts/sonar-file-metrics.mjs src/path/to/file.tsx');
  process.exit(1);
}

const componentKey = `ai-proxy-web:${filePath.replace(/\\/g, '/')}`;
const url = new URL('/api/measures/component', sonarHost);
url.searchParams.set('component', componentKey);
url.searchParams.set('metricKeys', 'duplicated_lines,duplicated_blocks,duplicated_lines_density');

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
  (payload.component?.measures ?? []).map((measure) => [measure.metric, measure.value ?? null]),
);

console.log(JSON.stringify({
  component: payload.component?.key ?? componentKey,
  duplicated_lines: Number(mapped.duplicated_lines ?? 0),
  duplicated_blocks: Number(mapped.duplicated_blocks ?? 0),
  duplicated_lines_density: Number(mapped.duplicated_lines_density ?? 0),
}, null, 2));
