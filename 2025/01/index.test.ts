import { describe, expect, it } from 'bun:test';
import { solveFirst, solveSecond } from './index.ts';

describe('2025-01', () => {
  const testInput = `L68
L30
R48
L5
R60
L55
L1
L99
R14
L82`;
  it('first', () => {
    expect(solveFirst(testInput)).toBe(3);
  });
  it('second', () => {
    expect(solveSecond(testInput)).toBe(6);
    expect(solveSecond(`R1000`)).toBe(10);
  });
});
