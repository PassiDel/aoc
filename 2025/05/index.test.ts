import { describe, expect, it } from 'bun:test';
import { solveFirst, solveSecond } from './index.ts';

describe('2025-05', () => {
  const testInput = `3-5
10-14
16-20
12-18

1
5
8
11
17
32`;
  it('first', () => {
    expect(solveFirst(testInput)).toBe(3);
  });
  it('second', () => {
    expect(solveSecond(testInput)).toBe(14);
  });
});
