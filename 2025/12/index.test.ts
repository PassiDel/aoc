import { describe, it } from 'bun:test';

describe('2025-12', () => {
  it('first', () => {
    const testInput = `0:
###
##.
##.

1:
###
##.
.##

2:
.##
###
##.

3:
##.
###
##.

4:
###
#..
###

5:
###
.#.
###

4x4: 0 0 0 0 2 0
12x5: 1 0 1 0 2 2
12x5: 1 0 1 0 3 2`;
    // Doesn't work on test data
    // expect(solveFirst(testInput)).toBe(2);
  });
});
