import { multArray } from '../../utils/array.ts';
import {
  calculateVariance,
  type Coordinate,
  CoordinateIndices,
  type Coordinates,
  type CoordinateSides,
  isCoordinateEqual
} from '../../utils/coordinates.ts';

function mod(x: number, m: number) {
  return ((x % m) + m) % m;
}

export function solveFirst(
  input: string,
  xMax = 101,
  yMax = 103,
  iterations = 100
): number {
  const match = input.matchAll(/^p=(-?\d*),(-?\d*) v=(-?\d*),(-?\d*)$/gm);

  const matches = Array.from(match, (m) => ({
    p: m.slice(1, 3).map(Number) as Coordinate,
    v: m.slice(3, 5).map(Number) as Coordinate
  }));

  const finalPositions = matches.map(
    (p) =>
      [
        mod(p.p[0] + p.v[0] * iterations, xMax),
        mod(p.p[1] + p.v[1] * iterations, yMax)
      ] as Coordinate
  );

  const centerX = Math.floor(xMax / 2);
  const centerY = Math.floor(yMax / 2);

  const sumQuadrants = finalPositions.reduce(
    (quads, position) => {
      const [x, y] = position;
      if (x < centerX) {
        if (y < centerY) {
          quads[0]++;
        } else if (y > centerY) {
          quads[3]++;
        }
      } else if (x > centerX) {
        if (y < centerY) {
          quads[1]++;
        } else if (y > centerY) {
          quads[2]++;
        }
      }
      return quads;
    },
    [0, 0, 0, 0]
  );

  return multArray(sumQuadrants);
}

export function solveSecond(input: string, xMax = 101, yMax = 103): number {
  const match = input.matchAll(/^p=(-?\d*),(-?\d*) v=(-?\d*),(-?\d*)$/gm);

  const matches = Array.from(match, (m) => ({
    p: m.slice(1, 3).map(Number) as Coordinate,
    v: m.slice(3, 5).map(Number) as Coordinate
  }));

  for (let i = 0; i < xMax * yMax; i++) {
    const finalPositions = matches.map(
      (p) =>
        [
          mod(p.p[0] + p.v[0] * i, xMax),
          mod(p.p[1] + p.v[1] * i, yMax)
        ] as Coordinate
    );
    const oX = calculateVariance(finalPositions, CoordinateIndices.x);

    const oY = calculateVariance(finalPositions, CoordinateIndices.y);
    calculateVariance([[0, 1, 2]] as CoordinateSides, CoordinateIndices.side);

    // hard coded, ups
    // would be better to find the lowest oX = lX in 0-maxX and lowest oY = lY in 0-maxY
    // then solve yMax * n + lY = xMax * (n+1) + lX, for n
    // IDK why x+1 tho
    if (oX < 600 && oY < 600) {
      if (process.env.NODE_ENV === 'production') {
        console.log(i, oX.toFixed(0), oY.toFixed(0));
        renderRobots(finalPositions, xMax, yMax);
      }
      return i;
    }
  }

  return 0;
}

function renderRobots(coords: Coordinates, xMax: number, yMax: number) {
  for (let y = 0; y < yMax; y++) {
    const row = new Array(xMax)
      .fill(' ')
      .map((_, x) =>
        coords.some((c) => isCoordinateEqual(c, [x, y])) ? '*' : ' '
      );
    console.log(row.join(''));
  }
}
