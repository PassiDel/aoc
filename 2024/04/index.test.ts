import { describe, expect, it } from 'bun:test';
import { solveFirst, solveSecond } from './index.ts';

describe('2024-04', () => {
  const testInput = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;
  it('first', () => {
    expect(solveFirst(testInput)).toBe(18);
  });
  it('second', () => {
    expect(solveSecond(testInput)).toBe(9);
  });
});
