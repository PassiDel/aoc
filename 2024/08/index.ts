import { combinations, unique } from '../../utils/array.ts';
import { inBounds, isCoordinateEqual } from '../../utils/coordinates.ts';

export function solveFirst(input: string): number {
  const rows = input.split('\n');

  const antennas = new Map<string, [number, number][]>();

  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      const digit = rows[y][x];
      if (digit === '.') {
        continue;
      }
      const entry = antennas.get(digit) || [];
      entry.push([x, y]);
      antennas.set(digit, entry);
    }
  }
  const antiNodes: [number, number][] = [];

  // console.log(rows);
  // console.log(antennas);
  antennas.forEach((positions) => {
    combinations(positions).forEach(({ a, b }) =>
      antiNodes.push([a[0] - (b[0] - a[0]), a[1] - (b[1] - a[1])])
    );
  });

  const validAntiNodes = antiNodes
    .filter(inBounds(rows[0].length, rows.length))
    .filter(unique(isCoordinateEqual));

  // validAntiNodes.forEach(([x, y]) => rows[y][x] === '.' && replaceChar(rows, x, y, '#'));
  //
  // console.log(rows.join('\n'));
  return validAntiNodes.length;
}

export function solveSecond(input: string): number {
  const rows = input.split('\n');

  const antennas = new Map<string, [number, number][]>();

  const yMax = rows.length;
  const xMax = rows[0].length;

  for (let y = 0; y < yMax; y++) {
    for (let x = 0; x < xMax; x++) {
      const digit = rows[y][x];
      if (digit === '.') {
        continue;
      }
      const entry = antennas.get(digit) || [];
      entry.push([x, y]);
      antennas.set(digit, entry);
    }
  }
  const antiNodes: [number, number][] = [];

  antennas.forEach((positions) => {
    combinations(positions).forEach(({ a, b }) => {
      for (let y = 0; y < yMax; y++) {
        antiNodes.push([a[0] + (b[0] - a[0]) * y, a[1] + (b[1] - a[1]) * y]);
      }
    });
  });

  const validAntiNodes = antiNodes
    .filter(inBounds(rows[0].length, rows.length))
    .filter(unique(isCoordinateEqual));

  // console.log(validAntiNodes);
  // validAntiNodes.forEach(
  //   ([x, y]) => rows[y][x] === '.' && replaceChar(rows, x, y, '#')
  // );
  //
  // console.log(rows.join('\n'));

  return validAntiNodes.length;
}
