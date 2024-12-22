import { describe, expect, it } from 'bun:test';
import { solveFirst, solveSecond } from './index.ts';

describe('2024-22', () => {
  it('first', () => {
    const testInput = `1
10
100
2024`;
    expect(solveFirst(testInput)).toBe(37327623);
  });
  it('second', () => {
    // it takes too long
    // so only run while `NODE_ENV=production bun test --coverage`
    if (process.env.NODE_ENV === 'production') {
      const testInput = `1
2
3
2024`;
      expect(solveSecond(testInput)).toBe(23);
    }
  });
});
