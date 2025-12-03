import { describe, expect, it } from 'bun:test';
import { solveFirst, solveSecond } from './index.ts';

describe('2025-03', () => {
  const testInput = `987654321111111
811111111111119
234234234234278
818181911112111`;
  it('first', () => {
    expect(solveFirst(testInput)).toBe(357);
  });
  it('second', () => {
    expect(solveSecond(testInput)).toBe(3121910778619);
  });
});
