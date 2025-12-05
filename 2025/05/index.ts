import type { Coordinate } from '../../utils/coordinates.ts';

function parseRanges(input: string) {
  return Array.from(
    input.matchAll(/(\d*)-(\d*)/gm),
    (m) => [Number(m[1]), Number(m[2])] as Coordinate
  );
}

export function solveFirst(input: string): number {
  const [r, i] = input.split('\n\n');

  const ranges = parseRanges(r);

  const ingredients = i.split('\n').map(Number);

  return ingredients.filter((i) =>
    ranges.some(([from, to]) => i >= from && i <= to)
  ).length;
}

export function solveSecond(input: string): number {
  const ranges = parseRanges(input).toSorted((a, b) => a[0] - b[0]);

  let total = 0;

  ranges.reduce((lastEnd, curr) => {
    if (curr[1] <= lastEnd) {
      return lastEnd;
    }
    total += curr[1] - Math.max(lastEnd + 1, curr[0]) + 1;
    return curr[1];
  }, 0);

  return total;
}
