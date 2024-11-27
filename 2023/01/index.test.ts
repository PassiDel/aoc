import { describe, expect, it } from 'bun:test';
import { solveFirst, solveSecond } from './index.ts';

describe('2023-01', () => {
  it('first', () => {
    const testInput = `1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet`;
    expect(solveFirst(testInput)).toBe(142);
  });
  it('second', () => {
    const testInput = `two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen`;
    expect(solveSecond(testInput)).toBe(281);
  });
});
