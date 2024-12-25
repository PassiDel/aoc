import { describe, expect, it } from 'bun:test';
import { solveFirst } from './index.ts';

describe('2024-25', () => {
  it('first', () => {
    const testInput = `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`;
    expect(solveFirst(testInput)).toBe(3);
  });
});
