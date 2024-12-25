import { uniqueCombinations } from '../../utils/array.ts';

type Op = 'AND' | 'OR' | 'XOR';
interface Operation {
  a: string;
  res: string;
  op: Op;
  b: string;
}

function evalOperations(
  operations: {
    a: string;
    res: string;
    op: 'AND' | 'OR' | 'XOR';
    b: string;
  }[],
  data: Record<string, boolean>
) {
  while (operations.length) {
    const operation = operations.shift()!;
    const { a, b, res, op } = operation;

    if (data[a] === undefined || data[b] === undefined) {
      operations.push(operation);
      continue;
    }

    switch (op) {
      case 'AND':
        data[res] = data[a] && data[b];
        break;
      case 'OR':
        data[res] = data[a] || data[b];
        break;
      case 'XOR':
        data[res] = data[a] !== data[b];
        break;
    }
  }
}

function bitsToBigInt(data: Record<string, boolean>, prefix: string) {
  return Object.keys(data)
    .filter((k) => k.startsWith(prefix))
    .toSorted()
    .reduce((s, k, i) => s + (BigInt(data[k]) << BigInt(i)), 0n);
}

export function solveFirst(input: string): bigint {
  const vars = Array.from(
    input.matchAll(/^(\S*): ([10])$/gm),
    (m) => [m[1], m[2] === '1'] as [string, boolean]
  );
  const operations = Array.from(
    input.matchAll(/^(\S*) (\w*) (\S*) -> (\S*)$/gm),
    (m) => ({
      a: m[1],
      b: m[3],
      res: m[4],
      op: m[2] as Op
    })
  );
  const data: Record<string, boolean> = {};
  vars.forEach(([k, v]) => (data[k] = v));
  evalOperations(operations, data);

  return bitsToBigInt(data, 'z');
}

function findDifference(a: bigint, b: bigint) {
  const indexes: number[] = [];
  const length = Math.max(a.toString(2).length, b.toString(2).length);
  const diff = [...(a ^ b).toString(2)];
  const lengthDiff = length - diff.length;
  for (let i = 0; i < diff.length; i++)
    if (diff[i] === '1') indexes.push(length - (i + lengthDiff + 1));
  return indexes;
}

function findDependance(operations: Operation[], key: number) {
  const found = new Set<string>();
  const k = `z${key.toString().padStart(2, '0')}`;
  const op = operations.find((o) => o.res === k)!;
  if (!op.a.match(/^[xyz]/)) {
    found.add(op.a);
  }
  if (!op.b.match(/^[xyz]/)) {
    found.add(op.b);
  }

  return [...found];
}

function getPairs(keys: string[]) {
  if (keys.length < 4) {
    return [];
  }

  const combs = uniqueCombinations(keys);
  const combs2 = uniqueCombinations(combs).filter(
    (c) => new Set([c.a.a, c.a.b, c.b.a, c.b.b]).size === 4
  );
  console.log(
    combs.length,
    combs2.length,
    combs2[0],
    combs2[combs2.length - 1]
  );

  return [];
}
