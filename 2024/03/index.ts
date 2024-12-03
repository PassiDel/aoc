import { sumArray } from '../../utils/array';

export function solveFirst(input: string): number {
  return sumArray(findAndEvalMul(input));
}

function findAndEvalMul(line?: string | null | undefined) {
  return Array.from(
    (line || '').matchAll(/mul\((\d{1,3}),(\d{1,3})\)/gm),
    (m) => Number(m[1]) * Number(m[2])
  );
}

export function solveSecond(input: string): number {
  const splits = input.split('do()').map((l) => l.split("don't()")[0]);

  return sumArray(splits.flatMap(findAndEvalMul));
}
