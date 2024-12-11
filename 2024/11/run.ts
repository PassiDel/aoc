import { join } from 'path';
import { solve } from './index.ts';

const input = await Bun.file(join(__dirname, 'input.txt')).text();

const firstAnswer = solve(input, 25);

console.log(firstAnswer);

const secondAnswer = solve(input, 75);

console.log(secondAnswer);
