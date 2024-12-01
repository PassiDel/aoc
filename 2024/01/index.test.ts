import { describe, expect, it } from 'bun:test';
import { solveFirst, solveSecond } from './index.ts';

const testInput = `3   4
4   3
2   5
1   3
3   9
3   3`;
describe('2024-01', () => {
  it('first', () => {
    expect(solveFirst(testInput)).toBe(11);
  });
  it('second', () => {
    expect(solveSecond(testInput)).toBe(31);
  });
});
