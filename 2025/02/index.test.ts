import { describe, expect, it } from 'bun:test';
import {
  findMultiRepetition,
  findSingleRepetition,
  solveFirst,
  solveSecond,
  sumMatches
} from './index.ts';

describe('2025-02', () => {
  const testInput = `11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124`;
  it('first', () => {
    expect(solveFirst(testInput)).toBe(1227775554);
  });
  it('second', () => {
    expect(solveSecond(testInput)).toBe(4174379265);
  });
  it('findSingleRepetition', () => {
    expect(sumMatches([[11, 22]], findSingleRepetition)).toBe(11 + 22);
    expect(sumMatches([[95, 115]], findSingleRepetition)).toBe(99);
    expect(sumMatches([[1188511880, 1188511890]], findSingleRepetition)).toBe(
      1188511885
    );
    expect(sumMatches([[565653, 565659]], findSingleRepetition)).toBe(0);
  });
  it('findMultiRepetition', () => {
    expect(sumMatches([[11, 22]], findMultiRepetition)).toBe(11 + 22);
    expect(sumMatches([[95, 115]], findMultiRepetition)).toBe(99 + 111);
    expect(sumMatches([[1188511880, 1188511890]], findMultiRepetition)).toBe(
      1188511885
    );
    expect(sumMatches([[565653, 565659]], findMultiRepetition)).toBe(565656);
  });
});
