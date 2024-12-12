import { sumArray } from '../../utils/array.ts';
import {
  calculateSides,
  type Coordinates,
  getAdjacent,
  getNeighbouringSides,
  isCoordinateEqual
} from '../../utils/coordinates.ts';

function searchNeighbours(
  visited: Set<number>,
  rows: string[],
  char: string,
  x: number,
  y: number,
  found: Coordinates
) {
  const position = y * rows.length + x;
  if (visited.has(position)) {
    return;
  }
  visited.add(position);
  found.push([x, y]);

  const { left, top, right, down } = getAdjacent(rows, x, y);
  if (left === char) {
    searchNeighbours(visited, rows, char, x - 1, y, found);
  }
  if (top === char) {
    searchNeighbours(visited, rows, char, x, y - 1, found);
  }
  if (right === char) {
    searchNeighbours(visited, rows, char, x + 1, y, found);
  }
  if (down === char) {
    searchNeighbours(visited, rows, char, x, y + 1, found);
  }
}

function groupChars(input: string) {
  const rows = input.split('\n');

  const groups: { char: string; coords: Coordinates }[] = [];
  const visited = new Set<number>();

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      const position = y * rows.length + x;
      if (visited.has(position)) {
        continue;
      }
      const char = rows[y][x];
      const coords: Coordinates = [];
      searchNeighbours(visited, rows, char, x, y, coords);

      groups.push({ char, coords });
    }
  }
  return groups;
}

function getPerimeter(g: Coordinates): number {
  if (g.length === 1) {
    return 4;
  }
  if (g.length === 2) {
    return 6;
  }
  const { uniqueSides } = calculateSides(g);

  return uniqueSides.length;
}

export function solveFirst(input: string): number {
  const groups = groupChars(input);

  return sumArray(groups.map((g) => g.coords.length * getPerimeter(g.coords)));
}

export function solveSecond(input: string): number {
  const groups = groupChars(input);

  return sumArray(groups.map((g) => g.coords.length * getSides(g.coords)));
}

export function getSides(g: Coordinates): number {
  if (g.length === 1) {
    return 4;
  }
  if (g.length === 2) {
    return 4;
  }
  const { uniqueSides } = calculateSides(g);

  const visited = new Set<number>();

  let sides = 0;
  for (let i = 0; i < uniqueSides.length; i++) {
    if (visited.has(i)) {
      continue;
    }
    visited.add(i);
    sides++;

    const { neighbours } = getNeighbouringSides(uniqueSides[i], uniqueSides);

    neighbours.forEach((c) =>
      visited.add(uniqueSides.findIndex((v) => isCoordinateEqual(v, c)))
    );
  }

  return sides;
}
