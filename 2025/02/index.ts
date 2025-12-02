import type { Coordinate, Coordinates } from '../../utils/coordinates.ts';

function parseInput(input: string) {
  const regex = /(\d*)-(\d*)/gm;
  const match = input.matchAll(regex);

  return Array.from(match, (m) => [Number(m[1]), Number(m[2])] as Coordinate);
}

export function sumMatches(ranges: Coordinates, foundRegex: RegExp) {
  return ranges.reduce((s, range) => {
    for (let i = range[0]; i <= range[1]; i++) {
      if (foundRegex.test(String(i))) {
        s += i;
      }
    }

    return s;
  }, 0);
}

export const findSingleRepetition = /^(\d*?)\1$/;
export function solveFirst(input: string): number {
  const ranges = parseInput(input);

  return sumMatches(ranges, findSingleRepetition);
}

export const findMultiRepetition = /^(\d*?)\1+$/;
export function solveSecond(input: string): number {
  const ranges = parseInput(input);

  return sumMatches(ranges, findMultiRepetition);
}
