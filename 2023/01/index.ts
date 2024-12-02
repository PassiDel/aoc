import { sumArray } from '../../utils/array.ts';

export function solveFirst(input: string): number {
  const regex = /^.*?(\d).*(\d).*?$|^.*(\d).*$/gm;
  const match = input.matchAll(regex);

  const numbers = Array.from(match, (m) =>
    Number(m[3] ? `${m[3]}${m[3]}` : `${m[1]}${m[2]}`)
  );
  return numbers.reduce((sum, number) => sum + number, 0);
}

export function solveSecond(input: string): number {
  const lookup: Record<string, string> = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '4',
    '5': '5',
    '6': '6',
    '7': '7',
    '8': '8',
    '9': '9',
    '0': '0'
  } as const;

  const regex =
    /^.*?(one|two|three|four|five|six|seven|eight|nine|\d).*(one|two|three|four|five|six|seven|eight|nine|\d).*?$|^.*(one|two|three|four|five|six|seven|eight|nine|\d).*$/gm;
  const match = input.matchAll(regex);

  const numbers = Array.from(match, (m) =>
    Number(
      m[3] ? `${lookup[m[3]]}${lookup[m[3]]}` : `${lookup[m[1]]}${lookup[m[2]]}`
    )
  );

  return sumArray(numbers);
}
