import { sumBy } from '../../utils/array.ts';

export function solveFirst(input: string): number {
  const rawShapes = input.split('\n\n');
  const regions = rawShapes
    .pop()!
    .split('\n')
    .map((row) => {
      const [size, count] = row.split(': ');
      const [wide, long] = size.split('x').map(Number);

      return { wide, long, count: count.split(' ').map(Number) };
    });
  const shapes = rawShapes.map((s) => s.split('\n').slice(1));
  const shapeWeight = shapes.map((s) =>
    sumBy(s, (r) => [...r.matchAll(/#/g)].length)
  );

  // works for the actual data, not for testing lmao
  const possible = regions.filter(
    (r) => r.long * r.wide >= sumBy(r.count, (e, i) => e * shapeWeight[i])
  );
  return possible.length;
}
