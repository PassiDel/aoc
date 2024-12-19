import { sumArray } from '../../utils/array.ts';

export function solveFirst(input: string): number {
  const [row, lines] = input.split('\n\n');
  const towels = row.split(', ').toSorted((a, b) => b.length - a.length);
  const combinations = lines.split('\n');

  const possibleCombinations = combinations.filter((c) =>
    isPossible(c, towels)
  );
  return possibleCombinations.length;
}

const lookup = new Map<string, number>();

export function allPossibilities(
  combination: string,
  towels: string[]
): number {
  const lookedUp = lookup.get(combination);
  if (lookedUp !== undefined) {
    return lookedUp;
  }
  if (combination.length <= 0) {
    lookup.set(combination, 1);
    return 1;
  }
  const prefixes = towels.filter((t) => combination.startsWith(t));
  if (prefixes.length <= 0) {
    lookup.set(combination, 0);
    return 0;
  }

  const result = sumArray(
    prefixes.map((p) =>
      allPossibilities(combination.substring(p.length), towels)
    )
  );
  lookup.set(combination, result);

  return result;
}

const lookupPossible = new Map<string, boolean>();

export function isPossible(combination: string, towels: string[]): boolean {
  const lookedUp = lookupPossible.get(combination);
  if (lookedUp !== undefined) {
    return lookedUp;
  }
  if (combination.length <= 0) {
    lookupPossible.set(combination, true);
    return true;
  }
  const prefixes = towels.filter((t) => combination.startsWith(t));
  if (prefixes.length <= 0) {
    lookupPossible.set(combination, false);
    return false;
  }

  const result = prefixes.some((p) =>
    isPossible(combination.substring(p.length), towels)
  );
  lookupPossible.set(combination, result);

  return result;
}

export function solveSecond(input: string): number {
  const [row, lines] = input.split('\n\n');
  const towels = row.split(', ').toSorted((a, b) => b.length - a.length);
  const combinations = lines.split('\n');

  const possibleCombinations = combinations.map((c) =>
    allPossibilities(c, towels)
  );

  return sumArray(possibleCombinations);
}
