import { uniqueCombinations } from '../../utils/array.ts';
import type { Coordinate } from '../../utils/coordinates.ts';

export function solveFirst(input: string): number {
  const reds = input
    .split('\n')
    .map((r) => r.split(',').map(Number) as Coordinate);

  const combs = uniqueCombinations(reds)
    .map(
      ({ a, b }) => (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1)
    )
    .toSorted((a, b) => b - a);
  return combs[0];
}

function calcArea(a: Coordinate, b: Coordinate) {
  return (Math.abs(a[0] - b[0]) + 1) * (Math.abs(a[1] - b[1]) + 1);
}

export function solveSecond(input: string): number {
  const reds = input
    .split('\n')
    .map((r) => r.split(',').map(Number) as Coordinate);

  const lines: Line[] = [];
  for (let i = 1; i < reds.length; i++) {
    lines.push([reds[i - 1], reds[i]]);
  }
  lines.push([reds[reds.length - 1], reds[0]]);

  let maxArea = 0;

  for (let i = 0; i < reds.length; i++) {
    for (let j = i + 1; j < reds.length; j++) {
      if (reds[i][0] == reds[j][0] || reds[i][1] == reds[j][1]) continue;
      const rectLines: Line[] = [
        [reds[i], reds[j]],
        [
          [reds[i][0], reds[j][1]],
          [reds[j][0], reds[i][1]]
        ]
      ];

      if (
        rectLines.some((rline) => lines.some((line) => intersects(rline, line)))
      ) {
        continue;
      }

      maxArea = Math.max(maxArea, calcArea(reds[i], reds[j]));
    }
  }

  return maxArea;
}

/**
 * Checks for intersection of two lines.
 * @param abcd Line (a,b)->(c,d)
 * @param pqrs Line (p,q)->(r,s)
 *
 * @see {@link https://stackoverflow.com/a/24392281/11271734|Source}
 */
export function intersects(abcd: Line, pqrs: Line) {
  const [a, b, c, d] = abcd.flat();
  const [p, q, r, s] = pqrs.flat();
  const det = (c - a) * (s - q) - (r - p) * (d - b);
  if (det === 0) {
    return false;
  } else {
    const lambda = ((s - q) * (r - a) + (p - r) * (s - b)) / det;
    const gamma = ((b - d) * (r - a) + (c - a) * (s - b)) / det;
    return 0 < lambda && lambda < 1 && 0 < gamma && gamma < 1;
  }
}

type Line = [Coordinate, Coordinate];
