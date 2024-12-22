import { describe, expect, it } from 'bun:test';
import { solveFirst, solveSecond } from './index.ts';

describe('2024-20', () => {
  const testInput = `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`;
  it('first', () => {
    expect(solveFirst(testInput, 1)).toBe(14 + 14 + 2 + 4 + 2 + 3 + 5);
  });
  it('second', () => {
    // it takes too long
    // so only run while `NODE_ENV=production bun test --coverage`
    if (process.env.NODE_ENV === 'production') {
      expect(solveSecond(testInput, 50)).toBe(
        32 + 31 + 29 + 39 + 25 + 23 + 20 + 19 + 12 + 14 + 12 + 22 + 4 + 3
      );
    }
  });
});
