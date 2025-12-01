import { mod } from '../../utils/numbers.ts';

const size = 100;
const initialValue = 50;

function parseInput(input: string) {
  const regex = /^([LR])(\d*)$/gm;
  const match = input.matchAll(regex);

  return Array.from(match, (m) => Number(m[2]) * (m[1] === 'L' ? -1 : 1));
}

export function solveFirst(input: string): number {
  let zeros = 0;
  parseInput(input).reduce((d, r) => {
    const newDial = (d + r) % size;
    if (newDial === 0) {
      zeros++;
    }
    return newDial;
  }, initialValue);

  return zeros;
}
export function solveSecond(input: string): number {
  const rots = parseInput(input);

  let zeros = 0;
  let dial = initialValue;

  // brute force is easier than thinking
  for (const rot of rots) {
    if (rot === 0) {
      continue;
    }
    for (let i = 0; i < Math.abs(rot); i++) {
      dial = mod(dial + (rot > 0 ? 1 : -1), size);
      if (dial === 0) {
        zeros++;
      }
    }
  }

  return zeros;
}
