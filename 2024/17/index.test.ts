import { describe, expect, it } from 'bun:test';
import { solveFirst, solveSecond } from './index.ts';

describe('2024-17', () => {
  it('first', () => {
    const testInput = `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`;
    expect(solveFirst(testInput)).toBe('4,6,3,5,6,3,5,2,1,0');
  });
  it('second', () => {
    const testInput = `Register A: 2024
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`;
    expect(solveSecond(testInput)).toBe(117440);
  });
});
