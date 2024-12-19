import { describe, expect, it } from 'bun:test';
import { solveFirst, solveSecond } from './index.ts';

describe('2024-18', () => {
  const testInput = `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`;
  it('first', () => {
    expect(solveFirst(testInput, 7, 7, 12)).toBe(22);
  });
  it('second', () => {
    expect(solveSecond(testInput, 7, 7, 12)).toBe('6,1');
  });
});
