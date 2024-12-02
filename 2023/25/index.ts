import { multBy } from '../../utils/array.ts';
import { randomInt } from '../../utils/random.ts';

function trySolve(
  nodes: { node: string; weight: number }[],
  edges: [string, string][]
) {
  while (nodes.length > 2) {
    const randEdgeIdx = randomInt(0, edges.length);
    const [u, v] = edges.splice(randEdgeIdx, 1)[0];

    const vertexU = nodes.find((n) => n.node === u)!;
    const vertexVIdx = nodes.findIndex((n) => n.node === v);
    const vertexV = nodes.splice(vertexVIdx, 1)[0];

    const oldNodes = [u, v];
    const mergedName = `(${u}:${v})`;

    const newEdges = edges
      .map(
        (e) =>
          [
            oldNodes.includes(e[0]) ? mergedName : e[0],
            oldNodes.includes(e[1]) ? mergedName : e[1]
          ] as [string, string]
      )
      .filter((e) => e[0] !== e[1]);
    edges.length = 0;
    edges.push(...newEdges);

    vertexU.node = mergedName;
    vertexU.weight += vertexV.weight;
  }
  const edgeLength = edges.length;

  const mult = multBy(nodes, (n) => n.weight);

  return { edgeLength, mult };
}

export function solveFirst(input: string): number {
  const regex = /^(\w*): (.*)$/gm;
  const match = input.matchAll(regex);

  const { edges, nodesSet } = Array.from(
    match,
    (m) => [m[1], m[2].split(' ')] as [string, string[]]
  ).reduce(
    ({ edges, nodesSet }, line) => {
      nodesSet.add(line[0]);
      line[1].forEach((n) => {
        nodesSet.add(n);
        edges.push([line[0], n]);
      });

      return { edges, nodesSet };
    },
    {
      edges: [] as [string, string][],
      nodesSet: new Set<string>()
    }
  );

  let edgeLength, mult;
  let i = 0;
  do {
    i++;
    const result = trySolve(
      Array.from(nodesSet, (n) => ({ node: n, weight: 1 })),
      [...edges]
    );
    edgeLength = result.edgeLength;
    mult = result.mult;
  } while (edgeLength > 3);

  if (process.env.NODE_ENV !== 'test') {
    console.log(`That took ${i} tries`);
    console.log(mult);
  }
  return mult;
}
