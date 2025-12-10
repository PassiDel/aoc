import { sumArray } from '../../utils/array.ts';

type Indicators = boolean[];
export function parseInput(input: string) {
  return input.split('\n').map((row) => {
    const buttons = row.split(' ').map((p) => p.substring(1, p.length - 1));
    const indicators = buttons
      .splice(0, 1)[0]
      .split('')
      .map((d) => d === '#') as Indicators;
    const joltage = buttons.splice(-1, 1)[0].split(',').map(Number);

    return {
      buttons: buttons.map((btns) => btns.split(',').map(Number)),
      indicators,
      joltage
    };
  });
}

export function solveFirst(input: string): number {
  const machines = parseInput(input);
  const steps = machines.map(({ buttons, indicators }) => {
    const start = new Array(indicators.length).fill(false) as Indicators;
    const queue = [[start, 0] as [Indicators, number]];
    const visited = new Set<string>();

    const goal = toStr(indicators);

    while (queue.length > 0) {
      const [state, step] = queue.shift()!;
      const stateStr = toStr(state);
      if (stateStr === goal) {
        return step;
      }
      if (visited.has(stateStr)) {
        continue;
      }
      visited.add(stateStr);
      buttons.forEach((button) => {
        const alteration = [...state];
        button.forEach((b) => (alteration[b] = !alteration[b]));
        if (visited.has(toStr(alteration))) {
          return;
        }
        queue.push([alteration, step + 1]);
      });
    }

    return 0;
  });

  return sumArray(steps);
}

function toStr(state: Indicators) {
  return state.map((v) => (v ? '#' : '.')).join();
}
