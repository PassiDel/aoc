import { describe, expect, it } from 'bun:test';
import { type Coordinate, inBounds, isCoordinateEqual } from './coordinates.ts';

describe('coordinates utils', () => {
  it('inBounds', () => {
    expect(inBounds(10, 10)([0, 0])).toBeTrue();
    expect(inBounds(10, 10)([9, 3])).toBeTrue();
    expect(inBounds(10, 10)([9, 9])).toBeTrue();
    expect(inBounds(10, 10)([10, 9])).toBeFalse();
    expect(inBounds(10, 10)([10, 0])).toBeFalse();
    expect(inBounds(10, 10)([-1, 0])).toBeFalse();
    expect(inBounds(10, 10)([-0.1, 0])).toBeFalse();
    expect(inBounds(10, 10)([0, 10000])).toBeFalse();
    expect(inBounds(10, 10)([10000, 10000])).toBeFalse();
    expect(inBounds(10, 10, 5, 5)([0, 0])).toBeFalse();
    expect(inBounds(10, 10, 5, 0)([5, 0])).toBeTrue();
    expect(inBounds(10, 10, 5, 0)([4, 0])).toBeFalse();
  });

  it('inBounds', () => {
    expect(isCoordinateEqual([0, 0], [0, 0])).toBeTrue();
    expect(isCoordinateEqual([0, 1], [0, 1])).toBeTrue();
    expect(isCoordinateEqual([0, 1], [1, 0])).toBeFalse();
    expect(isCoordinateEqual([1 + 2, 3 + 4], [3, 7])).toBeTrue();

    const a = [0, 0] as const;
    expect(isCoordinateEqual(a, a)).toBeTrue();

    const b: Coordinate = [0, 0];
    expect(isCoordinateEqual(b, b)).toBeTrue();
    expect(isCoordinateEqual(a, b)).toBeTrue();
  });
});
