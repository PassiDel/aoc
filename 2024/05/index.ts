import { getMiddleElement, sumArray } from '../../utils/array.ts';

export function solveFirst(input: string): number {
  const { order, rows } = parseInput(input);

  const filteredRows = rows.filter((r) => isInOrder(r, order));

  const middles = filteredRows.map((r) => r[Math.floor(r.length / 2)]);

  return sumArray(middles);
}

function parseInput(input: string) {
  const order = Array.from(
    input.matchAll(/^(\d*)\|(\d*)$/gm),
    (m) => [Number(m[1]), Number(m[2])] as [number, number]
  );
  const rows = Array.from(input.matchAll(/^(\d+,?)+$/gm), (m) =>
    m[0].split(',').map((n) => Number(n))
  );
  return { order, rows };
}

function isInOrder(numbers: number[], order: [number, number][]) {
  return numbers.every((number, index) => {
    return order
      .filter((o) => o[0] === number)
      .every((o) => numbers.indexOf(o[1]) > index || numbers.indexOf(o[1]) < 0);
  });
}

export function solveSecond(input: string): number {
  const { order, rows } = parseInput(input);

  const filteredRows = rows.filter((r) => !isInOrder(r, order));

  const sorted = filteredRows.map((r) =>
    r.toSorted((a, b) => {
      // Find [a,b] meaning a should be before b = -1
      return order.findIndex((o) => o[0] === a && o[1] === b) >= 0
        ? -1
        : // Find [b,a] meaning a should be after b = 1
          order.findIndex((o) => o[1] === a && o[0] === b) >= 0
          ? 1
          : // No order specified, just ignore = 0
            0;
    })
  );

  const middles = sorted.map(getMiddleElement);

  return sumArray(middles);
}
