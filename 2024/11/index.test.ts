import { describe, expect, it } from 'bun:test';
import { solve, solveFirstSlow } from './index.ts';

describe('2024-11', () => {
  const testInput = `125 17`;
  it('first slow', () => {
    // it takes too long
    // so only run while `NODE_ENV=production bun test --coverage`
    if (process.env.NODE_ENV === 'production') {
      expect(solveFirstSlow(testInput)).toBe(55312);
    }
  });
  it('first', () => {
    expect(solve(testInput, 25)).toBe(55312);
  });
  it('second', () => {
    expect(solve(testInput, 75)).toBeGreaterThan(55312);
  });
});
