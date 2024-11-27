import { join } from 'path';
import { solveFirst, solveSecond } from './index.ts';

const input = await Bun.file(join(__dirname, 'input.txt')).text();

const firstAnswer = solveFirst(input, { red: 12, green: 13, blue: 14 });

console.log(firstAnswer);

const secondAnswer = solveSecond(input);

console.log(secondAnswer);
