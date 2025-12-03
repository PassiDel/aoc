import { sumArray } from '../../utils/array.ts';

function findHighestDigit(digits: number[], start: number, end: number) {
  let highest = 0;
  let highestI = start;

  for (let i = start; i < digits.length - end; i++) {
    if (digits[i] > highest) {
      highest = digits[i];
      highestI = i;
    }
  }

  return highestI;
}

function findHighestNumber(row: string, size: number) {
  const rowSplit = row.split('');
  const digits = rowSplit.map(Number);

  const highest: number[] = [];
  for (let i = 0; i < size; i++) {
    const highestDigit = findHighestDigit(
      digits,
      (i > 0 ? highest[i - 1] : -1) + 1,
      size - i - 1
    );

    highest.push(highestDigit);
  }

  return Number(highest.map((key) => rowSplit[key]).join(''));
}

export function solveFirst(input: string): number {
  const rows = input.split('\n');

  return sumArray(rows.map((row) => findHighestNumber(row, 2)));
}

export function solveSecond(input: string): number {
  const rows = input.split('\n');

  return sumArray(rows.map((row) => findHighestNumber(row, 12)));
}
