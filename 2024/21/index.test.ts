import { describe, expect, it } from 'bun:test';
import { solveFirst } from './index.ts';

describe('2024-21', () => {
  it('first', () => {
    const testInput = `029A
980A
179A
456A
379A`;
    expect(solveFirst(testInput)).toBe(126384);
  });
});
