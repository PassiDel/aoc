import { groupBy, sumArray } from '../../utils/array.ts';

function splitColumnList(input: string) {
  const regex = /^(\d*) {3}(\d*)$/gm;
  const match = input.matchAll(regex);

  const [first, second] = Array.from(
    match,
    (m) => [Number(m[1]), Number(m[2])] as [number, number]
  ).reduce<[number[], number[]]>(
    ([listA, listB], [a, b]) => {
      listA.push(a);
      listB.push(b);
      return [listA, listB];
    },
    [[], []]
  );
  return { first, second };
}

export function solveFirst(input: string): number {
  const { first, second } = splitColumnList(input);

  first.sort();
  second.sort();

  const pairs = first.map((e, i) => Math.abs(e - second[i]));

  return sumArray(pairs);
}

export function solveSecond(input: string): number {
  const { first, second } = splitColumnList(input);

  const right = groupBy(second, (e) => e);

  const score = first.map(
    (e) => e * (right.find((r) => r.key === e)?.elements?.length || 0)
  );
  return sumArray(score);
}
