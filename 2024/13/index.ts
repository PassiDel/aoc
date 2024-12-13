import { sumArray } from '../../utils/array.ts';
import { type Coordinate, isInteger } from '../../utils/coordinates.ts';

function findIntersection(input: string, offset: number = 0) {
  const match = input.matchAll(
    /^Button A: X\+(\d*), Y\+(\d*)\nButton B: X\+(\d*), Y\+(\d*)\nPrize: X=(\d*), Y=(\d*)$/gm
  );

  const matches = Array.from(match, (m) => ({
    a: [m[1], m[2]].map(Number),
    b: [m[3], m[4]].map(Number),
    price: [m[5], m[6]].map((n) => Number(n) + offset)
  }));

  const intersection = matches
    .map(
      ({ a: [a1, a2], b: [b1, b2], price: [p1, p2] }) =>
        [
          (b1 * -p2 - b2 * -p1) / (a1 * b2 - a2 * b1),
          (-p1 * a2 - -p2 * a1) / (a1 * b2 - a2 * b1)
        ] as Coordinate
    )
    .filter(isInteger);

  return sumArray(intersection.map(([a, b]) => 3 * a + b));
}

export function solveFirst(input: string): number {
  return findIntersection(input);
}
export function solveSecond(input: string): number {
  return findIntersection(input, 10000000000000);
}
