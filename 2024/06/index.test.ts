import { describe, expect, it } from 'bun:test';
import { solveFirst } from './index.ts';

describe('2024-06', () => {
  const testInput = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;
  it('first', () => {
    expect(solveFirst(testInput)).toBe(41);
  });
  it('second', () => {
    // that takes too long
    // expect(solveSecond(testInput)).toBe(6);
  });
});
