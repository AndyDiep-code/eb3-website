#!/usr/bin/env node

import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.argv[2] ?? 'src';
const windowSize = Number(process.argv[3] ?? 8);
const files = [];

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const nextPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(nextPath);
      continue;
    }

    if (/\.(ts|tsx|js|jsx)$/.test(entry.name)) {
      files.push(nextPath);
    }
  }
}

function normalizeLine(line) {
  return line
    .replace(/\/\/.*$/g, '')
    .replace(/'[^']*'/g, "'STR'")
    .replace(/"[^"]*"/g, '"STR"')
    .replace(/`[^`]*`/g, '`STR`')
    .replace(/\b\d+(\.\d+)?\b/g, '0')
    .trim();
}

walk(rootDir);

for (const file of files) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  const chunks = new Map();

  for (let index = 0; index <= lines.length - windowSize; index += 1) {
    const chunk = lines.slice(index, index + windowSize).map(normalizeLine).join('\n');
    const signal = chunk.replace(/[\s{}();,<>'"`.:]/g, '');
    if (signal.length < 80) {
      continue;
    }

    const positions = chunks.get(chunk) ?? [];
    positions.push(index + 1);
    chunks.set(chunk, positions);
  }

  const candidates = [...chunks.entries()]
    .filter(([, positions]) => positions.length > 1)
    .sort((left, right) => right[1].length - left[1].length);

  if (!candidates.length) {
    continue;
  }

  const [chunk, positions] = candidates[0];
  const repeatedCoverage = positions.length * windowSize;
  if (repeatedCoverage < 16) {
    continue;
  }

  console.log(`\nFILE ${file}`);
  console.log(`occurrences=${positions.length} lines=${positions.join(',')}`);
  console.log(chunk.split('\n').slice(0, windowSize).join('\n'));
}
