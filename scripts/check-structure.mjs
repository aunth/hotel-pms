// Перевіряє, що в репозиторії є обов'язкові файли й каталоги (використовується в CI)
import { existsSync } from 'node:fs';

const required = ['README.md', '.gitignore', 'package.json', 'docs', 'src', 'tests'];
const missing = required.filter((p) => !existsSync(p));

if (missing.length > 0) {
  console.error(`Відсутні обов'язкові елементи: ${missing.join(', ')}`);
  process.exit(1);
}
console.log(`Структуру репозиторію перевірено: ${required.length} елементів на місці`);
