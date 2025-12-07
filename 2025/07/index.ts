import { MultiMap } from '../../utils/multi-map.ts';

export function solveFirst(input: string): number {
  const rows = input.split('\n');
  const start = rows[0].indexOf('S');

  const beams = new Set([start]);

  let splits = 0;
  for (let y = 1; y < rows.length; y++) {
    const newBeams: number[] = [];
    beams.forEach((beam) => {
      if (rows[y][beam] === '.' || beam >= rows[y].length) {
        return;
      }
      if (rows[y][beam] === '^') {
        splits++;
        beams.delete(beam);
        newBeams.push(beam - 1);
        newBeams.push(beam + 1);
      }
    });
    newBeams.forEach((b) => beams.add(b));
  }

  return splits;
}

export function solveSecond(input: string): number {
  const rows = input.split('\n');
  const start = rows[0].indexOf('S');

  return solveDown(rows, 1, start);
}

const cache = new MultiMap<number, [number, number]>();
function solveDown(map: string[], startY: number, startX: number): number {
  if (cache.multiHas(startY, startX)) {
    return cache.multiGet(startY, startX)!;
  }
  for (let y = startY; y < map.length; y++) {
    if (map[y][startX] === '^') {
      return cache.multiSet(
        solveDown(map, y + 1, startX - 1) + solveDown(map, y + 1, startX + 1),
        startY,
        startX
      );
    }
  }
  return 1;
}
