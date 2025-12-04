import { describe, expect, it } from 'bun:test';
import { solveFirst, solveSecond } from './index.ts';

describe('2025-04', () => {
  const testInput = `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`;
  it('first', () => {
    expect(solveFirst(testInput)).toBe(13);
  });
  it('second', () => {
    expect(solveSecond(testInput)).toBe(43);
  });
});
