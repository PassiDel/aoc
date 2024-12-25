import { sumArray, sumBy } from '../../utils/array.ts';

type KeyLock = number[];

function checkKeyLock(lock: KeyLock, key: KeyLock, max = 5) {
  if (lock.length !== key.length) {
    return false;
  }
  return lock.every((d, i) => d + key[i] <= max);
}

export function solveFirst(input: string): number {
  const [keys, locks] = input.split('\n\n').reduce(
    (combinations, b) => {
      const rows = b.split('\n');
      const isLock = b[0][0] === '#' ? 1 : 0;
      const comb: KeyLock = [];
      for (let i = 0; i < rows[0].length; i++) {
        const column = rows.flatMap((r) => r[i]);
        comb.push(column.filter((c) => c === '#').length - 1);
      }
      combinations[isLock].push(comb);
      return combinations;
    },
    [[], []] as [KeyLock[], KeyLock[]]
  );
  // const locks = blocks.filter((b) => b[0][0] === '#');
  // const key = blocks.filter((b) => b[0][0] === '.');

  const found = locks.map((l) =>
    sumBy(keys, (k) => (checkKeyLock(l, k) ? 1 : 0))
  );

  return sumArray(found);
}
