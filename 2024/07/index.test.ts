import { describe, expect, it } from 'bun:test';
import { solveFirst, solveSecond } from './index.ts';

describe('2024-07', () => {
  const testInput = `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`;
  it('first', () => {
    expect(solveFirst(testInput)).toBe(3749);
  });
  it('second', () => {
    const secondSolution = solveSecond(testInput);
    expect(secondSolution).toBe(11387);
    expect(secondSolution).toBeGreaterThanOrEqual(solveFirst(testInput));
  });
});
