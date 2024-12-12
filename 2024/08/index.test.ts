import { describe, expect, it } from 'bun:test';
import { solveFirst, solveSecond } from './index.ts';

describe('2024-08', () => {
  const testInput = `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`;
  it('first', () => {
    expect(solveFirst(testInput)).toBe(14);
  });
  it('second', () => {
    const secondTest = `T.........
...T......
.T........
..........
..........
..........
..........
..........
..........
..........`;
    expect(solveSecond(testInput)).toBe(34);
    expect(solveSecond(secondTest)).toBe(9);
  });
});