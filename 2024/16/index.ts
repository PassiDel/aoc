import { findCoordsOfDigit } from '../../utils/coordinates.ts';
import { PriorityQueue } from '../../utils/queue.ts';

export function solveFirst(input: string): number {
  const map = input.split('\n');
  const [x, y] = findCoordsOfDigit(map, 'S')[0];
  const start = { x, y, score: 0, dx: 1, dy: 0 };
  const possibleOptions = new PriorityQueue<typeof start>();

  possibleOptions.enqueue(start, 0);
  const visited = new Set<`${number}:${number}:${number}:${number}`>();
  visited.add(`${start.x}:${start.y}:${start.dx}:${start.dy}`);

  while (possibleOptions.size() > 0) {
    const el = possibleOptions.dequeue()!!;
    visited.add(`${el.node.x}:${el.node.y}:${el.node.dx}:${el.node.dy}`);
    if (map[el.node.y][el.node.x] === 'E') {
      return el.node.score;
    }
    for (let [nx, ny, score, ndx, ndy] of [
      [
        el.node.x + el.node.dx,
        el.node.y + el.node.dy,
        el.node.score + 1,
        el.node.dx,
        el.node.dy
      ],
      [el.node.x, el.node.y, el.node.score + 1000, el.node.dy, -el.node.dx],
      [el.node.x, el.node.y, el.node.score + 1000, -el.node.dy, el.node.dx]
    ]) {
      if (map[ny][nx] === '#') continue;
      if (visited.has(`${nx}:${ny}:${ndx}:${ndy}`)) continue;
      possibleOptions.enqueue({ x: nx, y: ny, score, dx: ndx, dy: ndy }, score);
    }
  }
  return 0;
}

export function solveSecond(input: string): number {
  // TODO: add code

  return 0;
}
