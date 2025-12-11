import { sumArray } from '../../utils/array.ts';

function parseInput(input: string) {
  return input.split('\n').map((row) => {
    const [from, _to] = row.split(': ');

    return { from, to: _to.split(' ') };
  });
}

function dfs(
  start: string,
  target: string,
  graph: ReturnType<typeof parseInput>,
  memo: Map<string, number> = new Map<string, number>()
) {
  if (start === target) {
    return 1;
  }
  if (memo.has(start)) {
    return memo.get(start)!;
  }
  const val = sumArray(
    graph
      .find((r) => r.from === start)
      ?.to?.map((to) => dfs(to, target, graph, memo)) || [0]
  );
  memo.set(start, val);

  return val;
}

export function solveFirst(input: string): number {
  const rows = parseInput(input);

  return dfs('you', 'out', rows);
}

export function solveSecond(input: string): number {
  const rows = parseInput(input);

  const svr_fft = dfs('svr', 'fft', rows);
  const fft_dac = dfs('fft', 'dac', rows);
  const dac_out = dfs('dac', 'out', rows);

  const svr_dac = dfs('svr', 'dac', rows);
  const dac_fft = dfs('dac', 'fft', rows);
  const fft_out = dfs('fft', 'out', rows);

  return svr_fft * fft_dac * dac_out + svr_dac * dac_fft * fft_out;
}
