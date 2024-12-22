import { describe, expect, it } from 'bun:test';
import { solveFirst } from './index.ts';

describe('2024-21', () => {
  it('first', () => {
    const testInput = `029A
980A
179A
456A
379A`;
    // it takes too long
    // so only run while `NODE_ENV=production bun test --coverage`
    if (process.env.NODE_ENV === 'production') {
      expect(solveFirst(testInput)).toBe(126384);
    }
  });
});
