import { describe, expect, it } from 'bun:test';
import { solveFirst, solveSecond } from './index.ts';

describe('2024-09', () => {
  const testInput = `2333133121414131402`;
  it('first', () => {
    expect(solveFirst('12345')).toBe(
      0 * 0 + 1 * 2 + 2 * 2 + 3 * 1 + 4 * 1 + 5 * 1 + 6 * 2 + 7 * 2 + 8 * 2
    );
    expect(solveFirst(testInput)).toBe(1928);
    expect(solveFirst('233313312141413140256')).toBe(3383);
  });
  it('second', () => {
    expect(solveSecond(testInput)).toBe(2858);
  });
});
