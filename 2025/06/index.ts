import { multArray, sumArray } from '../../utils/array.ts';

function sumOrMultArray(op: string, nums: number[]) {
  if (op === '*') {
    return multArray(nums);
  }
  return sumArray(nums);
}
export function solveFirst(input: string): number {
  const rows = input.split('\n');

  const ops = rows.splice(-1)[0].replaceAll(' ', '').split('');
  const parsed = rows.map((r) =>
    Array.from(r.matchAll(/(\d+)/g), (m) => m.slice(1).map(Number)).flat()
  );

  return ops.reduce(
    (s, op, i) =>
      s +
      sumOrMultArray(
        op,
        parsed.map((p) => p[i])
      ),
    0
  );
}

export function solveSecond(input: string): number {
  const rows = input.split('\n');
  const longestRow = Math.max(...rows.map((r) => r.length));

  const ops = rows.splice(-1)[0];

  const cache: number[] = [];
  let lastOp = '';
  let sum = 0;

  for (let i = 0; i < longestRow; i++) {
    if (ops[i] === '*' || ops[i] === '+') {
      sum += sumOrMultArray(lastOp, cache);
      cache.length = 0;
      lastOp = ops[i];
    }

    const digits = parseInt(rows.map((r) => r[i]).join(''));
    if (!isNaN(digits)) {
      cache.push(Number(digits));
    }
  }

  sum += sumOrMultArray(lastOp, cache);
  return sum;
}
