import { describe, expect, it } from 'bun:test';
import { solveFirst, solveSecond } from './index.ts';

describe('2024-10', () => {
  const testInput = `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`;
  it('first', () => {
    expect(
      solveFirst(`0123
1234
8765
9876`)
    ).toBe(1);
    expect(
      solveFirst(`...0...
...1...
...2...
6543456
7.....7
8.....8
9.....9`)
    ).toBe(2);
    expect(
      solveFirst(`..90..9
...1.98
...2..7
6543456
765.987
876....
987....`)
    ).toBe(4);
    expect(
      solveFirst(`10..9..
2...8..
3...7..
4567654
...8..3
...9..2
.....01`)
    ).toBe(3);

    expect(solveFirst(testInput)).toBe(36);
  });
  it('second', () => {
    expect(
      solveSecond(`.....0.
..4321.
..5..2.
..6543.
..7..4.
..8765.
..9....`)
    ).toBe(3);

    expect(
      solveSecond(`..90..9
...1.98
...2..7
6543456
765.987
876....
987....`)
    ).toBe(13);
    expect(
      solveSecond(`012345
123456
234567
345678
4.6789
56789.`)
    ).toBe(227);
    expect(solveSecond(testInput)).toBe(81);
  });
});
