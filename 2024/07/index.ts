import { sumBy } from '../../utils/array.ts';

export function solveFirst(input: string): number {
  const regex = /^(\d*): (.*)$/gm;
  const match = input.matchAll(regex);

  const rows = Array.from(match, (m) => ({
    sum: Number(m[1]),
    digits: m[2].split(' ').map((n) => Number(n))
  }));

  const possible = rows.filter((r) => {
    for (let t = 0; t < Math.pow(2, r.digits.length - 1); t++) {
      const sol = r.digits.reduce((sum, curr, i) =>
        evalTry(t, i, sum + curr, sum * curr)
      );
      if (sol === r.sum) {
        return true;
      }
    }
    return false;
  });

  // console.log(possible);
  return sumBy(possible, (p) => p.sum);
}

export function evalTry<T>(t: number, index: number, ...choices: T[]): T {
  const base = choices.length;
  const choice = Math.max(0, Math.floor(t / Math.pow(base, index - 1)) % base);

  return choices[choice];
}

export function solveSecond(input: string): number {
  const regex = /^(\d*): (.*)$/gm;
  const match = input.matchAll(regex);

  const rows = Array.from(match, (m) => ({
    sum: Number(m[1]),
    digits: m[2].split(' ').map((n) => Number(n))
  }));

  const possible = rows.filter((r) => {
    for (let t = 0; t < Math.pow(3, r.digits.length - 1); t++) {
      const sol = r.digits.reduce((sum, curr, i) =>
        evalTry(t, i, sum * curr, sum + curr, Number(`${sum}${curr}`))
      );
      if (sol === r.sum) {
        return true;
      }
    }

    return false;
  });

  // console.log(possible);
  return sumBy(possible, (p) => p.sum);
}
