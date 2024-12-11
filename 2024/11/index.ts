import { sumArray } from '../../utils/array.ts';
import { MultiMap } from '../../utils/multi-map.ts';

export function solveFirstSlow(input: string): number {
  const stones = input.split(' ');

  for (let i = 0; i < 25; i++) {
    let j = 0;
    while (j < stones.length) {
      const stone = stones[j];
      if (stone === '0') {
        stones[j] = '1';
        j++;
        continue;
      }
      if (stone.length % 2 === 0) {
        const secondStone = stone.substring(stone.length / 2);
        stones.splice(j + 1, 0, String(Number(secondStone)));
        stones[j] = stone.substring(0, stone.length / 2);
        j += 2;
        continue;
      }

      stones[j] = String(Number(stone) * 2024);
      j++;
    }
  }

  return stones.length;
}

const lookup = new MultiMap<number, [number, string]>();

function splits(stone: string, times: number): number {
  const lookedUp = lookup.multiGet(times, stone);
  if (lookedUp !== undefined) {
    return lookedUp;
  }

  if (times <= 0) {
    const result = 1;
    lookup.multiSet(result, times, stone);
    return result;
  }
  if (stone === '0') {
    const result = splits('1', times - 1);
    lookup.multiSet(result, times, stone);
    return result;
  }
  if (stone.length % 2 === 0) {
    const secondStone = stone.substring(stone.length / 2);
    const firstStone = stone.substring(0, stone.length / 2);
    const result =
      splits(firstStone, times - 1) +
      splits(String(Number(secondStone)), times - 1);

    lookup.multiSet(result, times, stone);
    return result;
  }

  const result = splits(String(Number(stone) * 2024), times - 1);

  lookup.multiSet(result, times, stone);
  return result;
}

export function solve(input: string, iterations: number): number {
  const stones = input.split(' ');

  const count = stones.map((stone) => splits(stone, iterations));

  return sumArray(count);
}
