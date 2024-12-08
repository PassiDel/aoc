import { describe, expect, it } from 'bun:test';
import { solveFirst, solveSecond } from './index.ts';

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
    // it takes too long
    // so only run while `NODE_ENV=production bun test --coverage`
    if (process.env.NODE_ENV === 'production') {
      expect(solveSecond(testInput)).toBe(6);
    }
  });
});
