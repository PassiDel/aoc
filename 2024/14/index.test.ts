import { describe, expect, it } from 'bun:test';
import { solveFirst } from './index.ts';

describe('2024-14', () => {
  const testInput = `p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`;
  it('first', () => {
    expect(solveFirst(`p=2,4 v=2,-3`, 11, 7, 0)).toBe(0);
    expect(solveFirst(testInput, 11, 7)).toBe(12);
  });
});
