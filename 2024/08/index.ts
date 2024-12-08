import { combinations, unique } from '../../utils/array.ts';
import {
  type Coordinates,
  inBounds,
  isCoordinateEqual
} from '../../utils/coordinates.ts';

export function groupCoordinates(rows: string[]) {
  const antennas = new Map<string, Coordinates>();

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      const char = rows[y][x];
      if (char === '.') {
        continue;
      }
      const entry = antennas.get(char) || [];
      entry.push([x, y]);
      antennas.set(char, entry);
    }
  }
  return antennas;
}

export function solveFirst(input: string): number {
  const rows = input.split('\n');
  const antennas = groupCoordinates(rows);
  const antiNodes: Coordinates = [];

  antennas.forEach((positions) => {
    combinations(positions).forEach(({ a, b }) =>
      antiNodes.push([a[0] - (b[0] - a[0]), a[1] - (b[1] - a[1])])
    );
  });

  const validAntiNodes = antiNodes
    .filter(inBounds(rows[0].length, rows.length))
    .filter(unique(isCoordinateEqual));

  return validAntiNodes.length;
}

export function solveSecond(input: string): number {
  const rows = input.split('\n');

  const antennas = groupCoordinates(rows);
  const antiNodes: Coordinates = [];

  antennas.forEach((positions) => {
    combinations(positions).forEach(({ a, b }) => {
      for (let y = 0; y < rows.length; y++) {
        antiNodes.push([a[0] + (b[0] - a[0]) * y, a[1] + (b[1] - a[1]) * y]);
      }
    });
  });

  const validAntiNodes = antiNodes
    .filter(inBounds(rows[0].length, rows.length))
    .filter(unique(isCoordinateEqual));

  // Show the anti-nodes on the input map
  //
  // validAntiNodes.forEach(
  //   ([x, y]) => rows[y][x] === '.' && replaceChar(rows, x, y, '#')
  // );
  //
  // console.log(rows.join('\n'));

  return validAntiNodes.length;
}
