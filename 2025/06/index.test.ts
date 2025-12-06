import { describe, expect, it } from 'bun:test';
import { solveFirst, solveSecond } from './index.ts';

describe('2025-06', () => {
  const testInput = `123 328  51 64 
 45 64  387 23 
  6 98  215 314
*   +   *   +  `;
  it('first', () => {
    expect(solveFirst(testInput)).toBe(4277556);
  });
  it('second', () => {
    expect(solveSecond(testInput)).toBe(3263827);
  });
});
