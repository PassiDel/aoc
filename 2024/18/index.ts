// @ts-ignore
import { astar, Graph } from 'javascript-astar';
import { replaceChar } from '../../utils/array.ts';
import {
  type Coordinate,
  inBounds,
  isCoordinateEqual
} from '../../utils/coordinates.ts';
import { MultiMap } from '../../utils/multi-map.ts';
import { PriorityQueue } from '../../utils/queue.ts';

function getGraph(
  allBytes: [number, number][],
  byteCount: number,
  height: number,
  width: number
): Graph {
  const bytes = allBytes.slice(0, byteCount);

  const map = new Array(height)
    .fill(null)
    .map((_, y) =>
      new Array(width)
        .fill(0)
        .map((_, x) =>
          bytes.findIndex((c) => isCoordinateEqual(c, [x, y])) >= 0 ? 0 : 1
        )
    );

  return new Graph(map);
}

export function solveFirst(
  input: string,
  width = 71,
  height = 71,
  byteCount = 1024
): number {
  const match = input.matchAll(/^(\d*),(\d*)/gm);

  const allBytes = Array.from(
    match,
    (m) => m.slice(1, 3).map(Number) as Coordinate
  );
  const graph = getGraph(allBytes, byteCount, height, width);

  const start = graph.grid[0][0];
  const end = graph.grid[height - 1][width - 1];

  const result = astar.search(graph, start, end);
  return result.length;
}

export function solveSecond(
  input: string,
  width = 71,
  height = 71,
  byteCount = 1024
): string {
  const match = input.matchAll(/^(\d*),(\d*)/gm);

  const allBytes = Array.from(
    match,
    (m) => m.slice(1, 3).map(Number) as Coordinate
  );

  // let lastPath: Coordinates = [];
  for (let i = byteCount; i < allBytes.length; i++) {
    const nextByte = allBytes[i];
    // if (
    //   lastPath.length > 0 &&
    //   !lastPath.some((p) => isCoordinateEqual(p, nextByte))
    // ) {
    //   console.log(lastPath);
    //   continue;
    // }

    const graph = getGraph(allBytes, i + 1, height, width);
    const start = graph.grid[0][0];

    const end = graph.grid[height - 1][width - 1];
    const result = astar.search(graph, start, end);
    if (result.length <= 0) {
      return nextByte.join(',');
    }
    // lastPath = result.map((n: GridNode) => [n.x, n.y] as Coordinate);
  }
  return '';
}

export function solveFirstOld(
  input: string,
  width = 71,
  height = 71,
  byteCount = 1024
): number {
  const match = input.matchAll(/^(\d*),(\d*)/gm);

  const bytes = Array.from(
    match,
    (m) => m.slice(1, 3).map(Number) as Coordinate
  ).slice(0, byteCount);

  const map = new Array(height)
    .fill(null)
    .map(() => new Array(width).fill('.').join('') as string);

  bytes.forEach(([x, y]) => replaceChar(map, x, y, '#'));
  replaceChar(map, width - 1, height - 1, 'E');

  console.log(map.join('\n'));
  const start = { x: 0, y: 0, score: 0 };
  const possibleOptions = new PriorityQueue<typeof start>();

  possibleOptions.enqueue(start, 0);
  const visited = new Set<`${number}:${number}`>();
  const scores = new MultiMap<number, Coordinate>();
  visited.add(`${start.x}:${start.y}`);

  let i = 0;
  while (possibleOptions.size() > 0) {
    const el = possibleOptions.dequeue()!!;

    scores.multiSet(el.node.score, el.node.y, el.node.x);
    visited.add(`${el.node.x}:${el.node.y}`);
    if (map[el.node.y]?.[el.node.x] === 'E') {
      // console.log(visited);
      return el.node.score;
    }
    if (possibleOptions.size() % 10_000 === 0) {
      console.log(visited.size, possibleOptions.size());
    }
    for (let [x, y] of [
      [0, 1],
      [0, -1],
      [1, 0],
      [-1, 0]
    ]) {
      const nx = el.node.x + x;
      const ny = el.node.y + y;
      const score = el.node.score + 1;
      if (!inBounds(width, height)([nx, ny]) || map[ny]?.[nx] === '#') {
        continue;
      }
      if (visited.has(`${nx}:${ny}`)) {
        continue;
      }
      const existingScore = scores.multiGet(ny, nx) || Number.MAX_SAFE_INTEGER;
      if (score < existingScore) {
        possibleOptions.enqueue({ x: nx, y: ny, score }, score);
      }
    }
    // console.log('a', el.node, visited.size, possibleOptions.size());
    // return 0;
    i++;

    if (i >= 10_000_000) {
      visited.forEach((v) => {
        const [x, y] = v.split(':').map(Number);
        replaceChar(map, x, y, 'O');
      });
      console.log(map.join('\n'));
      return 0;
    }
  }
  return 0;
}
