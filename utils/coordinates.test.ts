import { describe, expect, it } from 'bun:test';
import {
  type Coordinate,
  findCoordsOfDigit,
  getAdjacent,
  inBounds,
  isCoordinateEqual,
  isInteger
} from './coordinates.ts';

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

  it('getAdjacent', () => {
    const input = `0123
1234
8765
9876`.split('\n');

    const actualTopLeft = getAdjacent(input, 0, 0);

    expect(actualTopLeft).toBeObject();
    expect(Object.keys(actualTopLeft)).toHaveLength(8);
    expect(actualTopLeft.top).toBeUndefined();
    expect(actualTopLeft.topRight).toBeUndefined();
    expect(actualTopLeft.right).toEqual('1');
    expect(actualTopLeft.downRight).toEqual('2');
    expect(actualTopLeft.down).toEqual('1');
    expect(actualTopLeft.downLeft).toBeUndefined();
    expect(actualTopLeft.left).toBeUndefined();
    expect(actualTopLeft.topLeft).toBeUndefined();

    const actualFirst7 = getAdjacent(input, 1, 2);

    expect(actualFirst7).toBeObject();
    expect(Object.keys(actualFirst7)).toHaveLength(8);
    expect(actualFirst7.top).toEqual('2');
    expect(actualFirst7.topRight).toEqual('3');
    expect(actualFirst7.right).toEqual('6');
    expect(actualFirst7.downRight).toEqual('7');
    expect(actualFirst7.down).toEqual('8');
    expect(actualFirst7.downLeft).toEqual('9');
    expect(actualFirst7.left).toEqual('8');
    expect(actualFirst7.topLeft).toEqual('1');
  });

  it('findCoordsOfDigit', () => {
    const input = `0123
1234
8765
9876`.split('\n');
    const actualZero = findCoordsOfDigit(input, '0');

    expect(actualZero).toBeArray();
    expect(actualZero).toHaveLength(1);
    actualZero.forEach((coord) => expect(coord).toBeArray());
    actualZero.forEach((coord) => expect(coord).toBeArrayOfSize(2));
    expect(actualZero[0]).toEqual([0, 0]);

    const actualSeven = findCoordsOfDigit(input, '7');

    expect(actualSeven).toBeArray();
    expect(actualSeven).toHaveLength(2);
    actualSeven.forEach((coord) => expect(coord).toBeArray());
    actualSeven.forEach((coord) => expect(coord).toBeArrayOfSize(2));
    expect(actualSeven[0]).toEqual([1, 2]);
    expect(actualSeven[1]).toEqual([2, 3]);

    const actualSevenRegex = findCoordsOfDigit(input, /7/g);

    expect(actualSevenRegex).toBeArray();
    expect(actualSevenRegex).toHaveLength(2);
    actualSevenRegex.forEach((coord) => expect(coord).toBeArray());
    actualSevenRegex.forEach((coord) => expect(coord).toBeArrayOfSize(2));
    expect(actualSevenRegex[0]).toEqual([1, 2]);
    expect(actualSevenRegex[1]).toEqual([2, 3]);
  });

  it('isInteger', () => {
    expect(isInteger([1, 2])).toBeTrue();
    expect(isInteger([1, 2, 3])).toBeTrue();
    expect(isInteger([0, 0])).toBeTrue();
    expect(isInteger([0, 10.001])).toBeFalse();
    expect(isInteger([472.2948292, 10.001])).toBeFalse();
    expect(isInteger([-472.2948292, 10.001])).toBeFalse();
    expect(isInteger([-472.2948292, -10.001])).toBeFalse();
  });
});
