import { sumBy } from '../../utils/array.ts';
import {
  type Coordinate,
  type Coordinates,
  findCoordsOfDigit
} from '../../utils/coordinates.ts';

const DIRS = [
  // up
  [0, -1],
  // right
  [1, 0],
  // down
  [0, 1],
  // left
  [-1, 0]
] as Coordinates;

const DIRS_LIT = ['^', '>', 'v', '<'];
const numPad = ['789', '456', '123', '#0A'];
const dirPad = ['#^A', '<v>'];

const findShortestPaths = (pad: string[], startVal: string, endVal: string) => {
  const start = findCoordsOfDigit(pad, startVal === '^' ? /\^/g : startVal)[0];
  const stack: {
    p: Coordinate;
    path: string[];
    cost: number;
    dirId?: number;
  }[] = [{ p: start, path: [], cost: 0 }];
  const seen: Map<string, number> = new Map();
  const paths: string[][] = [];
  let minCost = Infinity;

  while (stack.length) {
    const {
      cost,
      dirId,
      p: [x, y],
      path
    } = stack.shift()!;
    if (dirId !== undefined) {
      path.push(DIRS_LIT[dirId]);
    }
    if (pad[y]?.[x] === endVal) {
      if (cost < minCost) {
        paths.length = 0;
        minCost = cost;
      }
      if (cost === minCost) paths.push(path);
      continue;
    }

    const k = `${x}_${y}`;
    if ((seen.get(k) || Infinity) < cost) {
      continue;
    }
    seen.set(k, cost);
    if (cost > minCost) {
      continue;
    }

    DIRS.forEach(([dx, dy], dirId) => {
      const [px, py] = [x + dx, y + dy];
      if (pad[py]?.[px] === '#') {
        return;
      }
      stack.push({
        path: [...path],
        p: [px, py],
        dirId,
        cost: cost + 1
      });
    });
  }

  return paths.map((p) => p.join('') + 'A');
};

const execute = (
  pad: string[],
  code: string,
  depth: number,
  memo: Map<string, number> = new Map()
) => {
  const k = `${code}_${depth}`;
  const saved = memo.get(k);
  if (saved !== undefined) return saved;

  let curPos = 'A';
  let length = 0;

  for (const nextPos of code.split('')) {
    const paths = findShortestPaths(pad, curPos, nextPos);
    if (depth === 0) {
      length += paths[0].length;
    } else {
      length += Math.min(
        ...paths.map((path) => execute(dirPad, path, depth - 1, memo))
      );
    }
    curPos = nextPos;
  }

  memo.set(k, length);
  return length;
};
export function solveFirst(input: string): number {
  return sumBy(
    input.split('\n'),
    (code) => parseInt(code) * execute(numPad, code, 2)
  );
}

export function solveSecond(input: string): number {
  return sumBy(
    input.split('\n'),
    (code) => parseInt(code) * execute(numPad, code, 25)
  );
}
