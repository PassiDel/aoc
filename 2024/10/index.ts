import { sumArray, unique } from '../../utils/array.ts';
import {
  type Coordinates,
  findCoordsOfDigit,
  getAdjacent,
  isCoordinateEqual
} from '../../utils/coordinates.ts';

export function getScoreOfHead(
  rows: string[],
  startX: number,
  startY: number,
  startDigit = 0
): Coordinates {
  if (startDigit >= 9) {
    return [[startX, startY]];
  }

  const top = rows[startY - 1]?.[startX];
  const right = rows[startY]?.[startX + 1];
  const down = rows[startY + 1]?.[startX];
  const left = rows[startY]?.[startX - 1];

  let found: Coordinates = [];
  const lookFor = startDigit + 1;

  if (top && Number(top) === lookFor) {
    found.push(...getScoreOfHead(rows, startX, startY - 1, lookFor));
  }
  if (right && Number(right) === lookFor) {
    found.push(...getScoreOfHead(rows, startX + 1, startY, lookFor));
  }
  if (down && Number(down) === lookFor) {
    found.push(...getScoreOfHead(rows, startX, startY + 1, lookFor));
  }
  if (left && Number(left) === lookFor) {
    found.push(...getScoreOfHead(rows, startX - 1, startY, lookFor));
  }

  return found;
}

export function solveFirst(input: string): number {
  const rows = input.split('\n');

  const trailHeads = findCoordsOfDigit(rows, '0');

  const scores = trailHeads.map(
    ([startX, startY]) =>
      getScoreOfHead(rows, startX, startY).filter(unique(isCoordinateEqual))
        .length
  );

  return sumArray(scores);
}

export function getRatingOfHead(
  rows: string[],
  startX: number,
  startY: number,
  startDigit = 0
): Coordinates[] {
  if (startDigit >= 9) {
    return [[[startX, startY]]];
  }

  const { top, right, left, down } = getAdjacent(rows, startX, startY);

  let found: Coordinates[] = [];
  const lookFor = startDigit + 1;

  if (top && Number(top) === lookFor) {
    found.push(...getRatingOfHead(rows, startX, startY - 1, lookFor));
  }
  if (right && Number(right) === lookFor) {
    found.push(...getRatingOfHead(rows, startX + 1, startY, lookFor));
  }
  if (down && Number(down) === lookFor) {
    found.push(...getRatingOfHead(rows, startX, startY + 1, lookFor));
  }
  if (left && Number(left) === lookFor) {
    found.push(...getRatingOfHead(rows, startX - 1, startY, lookFor));
  }

  return found;
}

export function solveSecond(input: string): number {
  const rows = input.split('\n');

  const trailHeads = findCoordsOfDigit(rows, '0');

  const scores = trailHeads.map(
    ([startX, startY]) => getRatingOfHead(rows, startX, startY).length
  );

  return sumArray(scores);
}
