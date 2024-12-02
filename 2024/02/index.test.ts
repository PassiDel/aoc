import { describe, expect, it } from 'bun:test';
import { solveFirst, solveSecond } from './index.ts';

describe('2024-02', () => {
  const testInput = `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`;
  it('first', () => {
    expect(solveFirst(testInput)).toBe(2);
  });
  it('second', () => {
    expect(solveSecond(testInput)).toBe(4);
  });
});
