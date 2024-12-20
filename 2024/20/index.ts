import { Presets, SingleBar } from 'cli-progress';
import { replaceChar } from '../../utils/array.ts';
import {
  type Coordinate,
  type Coordinates,
  findCoordsOfDigit,
  getAdjacent,
  inBounds,
  isCoordinateEqual
} from '../../utils/coordinates.ts';

export function solveFirst(input: string, minSave = 100): number {
  return solve(input, 2, minSave);
}
export function solveSecond(input: string, minSave = 100): number {
  return solve(input, 20, minSave);
}

function findPath(
  rows: string[],
  start: Coordinate,
  end: Coordinate
): Coordinates {
  let [x, y] = start;
  const path: Coordinates = [];
  while (x !== end[0] || y !== end[1]) {
    const last = path.slice(-1)[0] || [-1, -1];
    path.push([x, y]);

    const { top, right, down, left } = getAdjacent(rows, x, y);

    if (top === '.' && last[1] !== y - 1) {
      y--;
    } else if (right === '.' && last[0] !== x + 1) {
      x++;
    } else if (down === '.' && last[1] !== y + 1) {
      y++;
    } else if (left === '.' && last[0] !== x - 1) {
      x--;
    }
  }
  return path;
}

function getCheatDirections(maxDistance: number) {
  const cheatDirections: Coordinates = [];
  for (let x = -maxDistance; x <= maxDistance; x++) {
    for (let y = -maxDistance; y <= maxDistance; y++) {
      const d = Math.abs(x) + Math.abs(y);
      if (d > 0 && d <= maxDistance) {
        cheatDirections.push([x, y]);
      }
    }
  }
  return cheatDirections;
}

function solve(input: string, maxDistance: number, minSave: number): number {
  const rows = input.split('\n');

  const start = findCoordsOfDigit(rows, 'S')[0];
  const end = findCoordsOfDigit(rows, 'E')[0];

  replaceChar(rows, start[0], start[1], '.');
  replaceChar(rows, end[0], end[1], '.');

  const path = findPath(rows, start, end);
  const totalLength = path.length;

  const cheatDirections = getCheatDirections(maxDistance);
  const isInBounds = inBounds(rows[0].length, rows.length);
  const bar =
    process.env.NODE_ENV === 'test'
      ? null
      : new SingleBar({}, Presets.shades_classic);
  bar?.start(totalLength, 0);

  const cheats = path.flatMap((cell, i) => {
    const [x, y] = cell;
    const downgrade = path.slice(0, i + 3);

    const potentialSpots = cheatDirections
      .map(([dx, dy]) => [x + dx, y + dy] as Coordinate)
      .filter(
        (c) =>
          isInBounds(c) &&
          rows[c[1]][c[0]] === '.' &&
          !downgrade.some((d) => isCoordinateEqual(c, d))
      );
    bar?.increment();

    return potentialSpots
      .map((newStart) => {
        const end = path.findIndex((p) => isCoordinateEqual(p, newStart));
        return {
          newStart,
          cell,
          length:
            (end < 0 ? totalLength : end) -
            (i +
              (Math.abs(cell[0] - newStart[0]) +
                Math.abs(cell[1] - newStart[1])))
        };
      })
      .filter((d) => d.length >= minSave);
  });

  bar?.start(cheats.length, 0);
  const existing = new Set<string>();
  for (let cheat of cheats) {
    bar?.increment();
    const key = `${cheat.cell.join(',')}-${cheat.newStart.join(',')}`;
    if (existing.has(key)) {
      continue;
    }
    existing.add(key);
  }
  bar?.stop();
  return existing.size;
}
