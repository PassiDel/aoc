import { multBy, uniqueIndexCombinations } from '../../utils/array.ts';
import { euclideanDistanceSqrtless } from '../../utils/coordinates.ts';

export function solveFirst(input: string, count = 1000): number {
  const junctions = input
    .split('\n')
    .map((row) => row.split(',').map(Number) as [number, number, number]);

  const edges = uniqueIndexCombinations(junctions)
    .map(
      ({ aI, bI }) =>
        [aI, bI, euclideanDistanceSqrtless(junctions[aI], junctions[bI])] as [
          number,
          number,
          number
        ]
    )
    .toSorted((a, b) => a[2] - b[2]);

  const circuits = junctions.map((_, i) => [i]);

  for (let i = 0; i < edges.length; i++) {
    const [u, v] = edges[i];
    const circuitU = circuits.find((c) => c.includes(u))!;
    const circuitV = circuits.find((c) => c.includes(v))!;

    if (i === count)
      return multBy(
        circuits.toSorted((a, b) => b.length - a.length).slice(0, 3),
        (e) => e.length
      );

    // already in same circuit, ignore
    if (circuitU === circuitV) continue;

    // merge v into u
    circuitU.push(...circuitV);
    circuits.splice(circuits.indexOf(circuitV), 1);

    // end condition for second
    if (circuits.length === 1) {
      return junctions[u][0] * junctions[v][0];
    }
  }

  return -1;
}

export function solveSecond(input: string): number {
  return solveFirst(input, Number.MAX_SAFE_INTEGER);
}
