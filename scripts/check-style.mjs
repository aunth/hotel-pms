// Простий контроль стилю (використовується в CI): без табуляцій і пробілів в кінці рядка
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dirs = ['src', 'tests', 'scripts'];
const problems = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) {
      walk(path);
    } else if (/\.(ts|mjs)$/.test(name)) {
      readFileSync(path, 'utf8').split('\n').forEach((line, i) => {
        if (line.includes('\t')) problems.push(`${path}:${i + 1}: табуляція`);
        if (/\s+$/.test(line)) problems.push(`${path}:${i + 1}: пробіли в кінці рядка`);
      });
    }
  }
}

dirs.forEach(walk);
if (problems.length > 0) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`Стиль перевірено: ${dirs.join(', ')} без зауважень`);
