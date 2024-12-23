import { uniqueCombinations } from '../../utils/array.ts';

export function solveFirst(input: string): number {
  const connections = extractConnections(input);

  const found = new Set<string>();
  for (let key in connections) {
    if (!key.startsWith('t')) {
      continue;
    }
    getTriangles(connections, key).forEach((t) => found.add(t));
  }

  return found.size;
}

function getTriangles(connections: Record<string, string[]>, key: string) {
  const tripplePairs = uniqueCombinations(connections[key]).filter(({ a, b }) =>
    connections[a].includes(b)
  );
  return tripplePairs.map(({ a, b }) => [key, a, b].toSorted().join(','));
}

function extractConnections(input: string) {
  const connections: Record<string, string[]> = {};
  const pairs = input.split('\n').map((r) => r.split('-') as [string, string]);

  pairs.forEach(([a, b]) => {
    connections[a] = [...(connections[a] || []), b];
    connections[b] = [...(connections[b] || []), a];
  });
  return connections;
}

export function solveSecond(input: string): string {
  const connections = extractConnections(input);

  const triples = new Set<string>();
  for (let key in connections) {
    getTriangles(connections, key).forEach((t) => triples.add(t));
  }
  const triangles = [...triples];

  let maxSize = 0;
  const triaggs: string[][] = [];
  for (let key in connections) {
    const triags = triangles.filter((t) => t.includes(key));

    if (triags.length > maxSize) {
      maxSize = triags.length;
    }
    triaggs.push(triags);
  }
  const notInMax = new Set(
    triaggs
      .filter((ts) => ts.length < maxSize)
      .map((ts) => ts.map((t) => t.split(',')))
      .flat(2)
  );
  const allNodes = new Set(Object.keys(connections));

  return [...allNodes.difference(notInMax)].toSorted().join(',');
}
