import { describe, expect, it } from 'bun:test';
import { getSides, solveFirst, solveSecond } from './index.ts';

describe('2024-12', () => {
  it('first', () => {
    expect(
      solveFirst(`AAAA
BBCD
BBCC
EEEC`)
    ).toBe(140);
    expect(
      solveFirst(`OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`)
    ).toBe(772);
    expect(
      solveFirst(`RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`)
    ).toBe(1930);
  });

  it('second', () => {
    // it takes too long
    // so only run while `NODE_ENV=production bun test --coverage`
    if (process.env.NODE_ENV === 'production') {
      expect(
        solveSecond(`EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`)
      ).toBe(236);
      expect(
        solveSecond(`AAAA
BBCD
BBCC
EEEC`)
      ).toBe(80);
      expect(
        solveSecond(`OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`)
      ).toBe(436);
      expect(
        solveSecond(`AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`)
      ).toBe(368);
    }
  });

  it('sides', () => {
    expect(
      getSides([
        [0, 0],
        [1, 0],
        [2, 0],
        [0, 1]
      ])
    ).toBe(6);
  });
});
