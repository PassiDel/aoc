import { describe, expect, it } from 'bun:test';
import { solveFirst, solveSecond } from './index.ts';

describe('2025-09', () => {
  const testInput = `7,1
11,1
11,7
9,7
9,5
2,5
2,3
7,3`;
  it('first', () => {
    expect(solveFirst(testInput)).toBe(50);
  });
  it('second', () => {
    expect(solveSecond(testInput)).toBe(25);
  });
});
