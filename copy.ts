import { existsSync } from 'node:fs';
import { copyFile, mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';
import prompts from 'prompts';
import { replaceInFile } from 'replace-in-file';

// Select year and date
const { year, day } = await prompts([
  {
    type: 'number',
    name: 'year',
    message: 'What year?',
    initial: new Date().getFullYear(),
    validate: (val) =>
      val > 2000 && val < 3000 ? true : 'Year needs to be between 2000-3000',
    format: String
  },
  {
    type: 'number',
    name: 'day',
    message: 'What day?',
    initial: new Date().getDate(),
    validate: (val) =>
      val > 0 && val < 32 ? true : 'Day needs to be between 1-31',
    format: (val) => String(val).padStart(2, '0')
  }
]);

const dir = join(year, day);

if (existsSync(dir)) {
  console.warn('Directory already exists!');
  process.exit(1);
}

// Create new day folder
await mkdir(dir, { recursive: true });

// Parse template folder for files
const templateDir = 'template';
const files = await readdir(templateDir);

const yearRegex = /YYYY/g;
const dayRegex = /DD/g;

// Copy files from template to day folder, replace placeholders in filename
await Promise.all(
  files.map((f) =>
    copyFile(
      join(templateDir, f),
      join(dir, f.replaceAll(yearRegex, year).replaceAll(dayRegex, day))
    )
  )
);

// Replace placeholders in code
const resultYear = await replaceInFile({
  files: [join(dir, '*')],
  from: yearRegex,
  to: year
});
const resultDay = await replaceInFile({
  files: [join(dir, '*')],
  from: dayRegex,
  to: day
});

const results = [...resultYear, ...resultDay];

if (results.filter((r) => r.hasChanged).length <= 0) {
  console.error(
    'Something went wrong while replace placeholders! Did they change?'
  );
  process.exit(1);
}

console.log('Directory created! Have fun!');
