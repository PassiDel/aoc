import { sumBy } from '../../utils/array.ts';

export function replace(arr: string[], x: number, y: number, char: string) {
  arr[y] = arr[y].substring(0, x) + char + arr[y].substring(x + 1);
}

const directions = [
  { d: '^', x: 0, y: -1 },
  { d: '>', x: 1, y: 0 },
  { d: 'v', x: 0, y: 1 },
  { d: '<', x: -1, y: 0 }
] as const;

export function solveFirst(input: string): number {
  const rows = input.split('\n');

  const columnCount = rows[0].length;
  const rowCount = rows.length;

  let y = rows.findIndex((r) => r.indexOf('^') >= 0);
  let x = rows[y].indexOf('^');
  let direction = 0;

  while (x >= 0 && x < columnCount && y >= 0 && y < rowCount) {
    const nextX = x + directions[direction].x;
    const nextY = y + directions[direction].y;
    if (rows[nextY]?.[nextX] === '#') {
      direction = (direction + 1) % 4;
    }

    replace(rows, x, y, 'X');
    x += directions[direction].x;
    y += directions[direction].y;
  }
  return sumBy(rows, (r) => [...r.matchAll(/X/g)].length);
}

export function getNextObstacle(
  rows: string[],
  startX: number,
  startY: number,
  d: number
): false | { x: number; y: number } {
  let x = startX;
  let y = startY;

  while (true) {
    const nextX = x + directions[d].x;
    const nextY = y + directions[d].y;
    const next = rows[nextY]?.[nextX];
    if (!next) {
      return false;
    }
    if (next === '#') {
      return { x, y };
    }
    x = nextX;
    y = nextY;
  }
}

export function finishes(
  rows: string[],
  startX: number,
  startY: number,
  d: number
): boolean {
  let x = startX;
  let y = startY;

  let i = 0;
  do {
    const next = getNextObstacle(rows, x, y, (d + i) % 4);
    if (!next) {
      return true;
    }
    x = next.x;
    y = next.y;
    i++;

    // TODO: be smarter
  } while (i < 1_000_000);

  return false;
}

export function solveRow(
  rows: string[],
  row: number,
  startX: number,
  startY: number,
  startDirection: number
) {
  let found = 0;

  for (let column = 0; column < rows[0].length; column++) {
    if ((row === startX && column === startY) || rows[row][column] === '#') {
      continue;
    }

    replace(rows, column, row, '#');
    if (!finishes(rows, startX, startY, startDirection)) {
      found++;
    }

    replace(rows, column, row, '.');
  }
  return found;
}

export function solveSecond(input: string): number {
  const rows = input.split('\n');
  const rowCount = rows.length;

  const y = rows.findIndex((r) => r.indexOf('^') >= 0);
  const x = rows[y].indexOf('^');
  const direction = 0;

  let found = 0;

  for (let row = 0; row < rowCount; row++) {
    found += solveRow(rows, row, x, y, direction);
    console.log('row:', row, 'found', found);
  }

  return found;
}
