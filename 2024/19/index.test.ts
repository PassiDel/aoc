import { describe, expect, it } from 'bun:test';
import { solveFirst, solveSecond } from './index.ts';

describe('2024-19', () => {
  const testInput = `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`;
  it('first', () => {
    expect(solveFirst(testInput)).toBe(6);
  });
  it('second', () => {
    expect(solveSecond(testInput)).toBe(16);
  });
});
