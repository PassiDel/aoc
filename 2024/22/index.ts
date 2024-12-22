import { Presets, SingleBar } from 'cli-progress';
import { sumArray } from '../../utils/array.ts';
import { mod } from '../../utils/numbers.ts';

export function solveFirst(input: string): number {
  const start = input.split('\n').map(Number);

  const end = start.map((v) => {
    let value = v;
    for (let i = 0; i < 2000; i++) {
      value = mod((value * 64) ^ value, 16777216);
      value = mod(Math.floor(value / 32) ^ value, 16777216);
      value = mod((value * 2048) ^ value, 16777216);
    }
    return value;
  });
  return sumArray(end);
}

type Sequence = [number, number, number, number];

function findPriceBySequence(
  prices: [number, number][],
  sequence: Sequence
): number {
  return (
    prices.find(
      (p, i, a) => i >= 4 && sequence.every((s, si) => s === a[i - (3 - si)][1])
    )?.[0] || 0
  );
}

function getSequences(prices: [number, number][]): string[] {
  const sequences = new Array<string>(prices.length - 4);
  for (let i = 4; i < prices.length; i++) {
    sequences[i - 4] = [
      prices[i - 3][1],
      prices[i - 2][1],
      prices[i - 1][1],
      prices[i][1]
    ].join(',');
  }
  return sequences;
}

export function solveSecond(input: string): number {
  const start = input.split('\n').map(Number);

  const prices = start.map((v) => {
    let value = v;
    const sec = new Array<[number, number]>(2000);
    sec[0] = [mod(value, 10), 0];
    let lastPrice = sec[0][0];
    for (let i = 0; i < 2000; i++) {
      value = mod((value * 64) ^ value, 16777216);
      value = mod(Math.floor(value / 32) ^ value, 16777216);
      value = mod((value * 2048) ^ value, 16777216);
      const price = mod(value, 10);
      sec[i + 1] = [price, price - lastPrice];
      lastPrice = price;
    }
    return sec;
  });

  const sequences = prices.flatMap((p) => getSequences(p));
  const uniqueSequences = new Set(sequences);
  const bar =
    process.env.NODE_ENV === 'test'
      ? null
      : new SingleBar({}, Presets.shades_classic);
  bar?.start(uniqueSequences.size, 0);
  let highestPrice = 0;

  for (let sequence of uniqueSequences) {
    const numSequence = sequence.split(',').map(Number) as Sequence;
    const finalPrices = sumArray(
      prices.map((p) => findPriceBySequence(p, numSequence))
    );

    if (finalPrices > highestPrice) {
      highestPrice = finalPrices;
    }
    bar?.increment();
  }
  bar?.stop();

  return highestPrice;
}
