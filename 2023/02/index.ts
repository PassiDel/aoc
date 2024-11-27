import { groupBy, multBy, sumArray, sumBy } from '../../utils/array.ts';

export type AllowedCubes = Record<string, number>;

function parseInput(input: string) {
  const matchLine = input.matchAll(/^Game (\d*): (.*)$/gm);

  return Array.from(matchLine, (m) => ({
    id: Number(m[1]),
    rounds: m[2].split('; ').map((r) =>
      r.split(', ').map((g) => {
        const [amount, color] = g.split(' ');
        return { color, amount: Number(amount) };
      })
    )
  }));
}

export function solveFirst(input: string, allowed: AllowedCubes): number {
  const games = parseInput(input);

  const possible = games.filter(
    (g) =>
      !g.rounds.some((r) =>
        r.some((s) => !(s.color in allowed) || s.amount > allowed[s.color])
      )
  );

  return sumBy(possible, (a) => a.id);
}

export function solveSecond(input: string): number {
  const games = parseInput(input);

  const leastCubes = games.map((g) =>
    groupBy(g.rounds.flat(), (e) => e.color).map(({ key, elements }) => ({
      key,
      amount: elements.toSorted((a, b) => b.amount - a.amount)[0].amount
    }))
  );

  const powers = leastCubes.map((cubes) => multBy(cubes, (c) => c.amount));

  return sumArray(powers);
}
