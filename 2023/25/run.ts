import { join } from 'path';
import { solveFirst } from './index.ts';

const input = await Bun.file(join(__dirname, 'input.txt')).text();

const firstAnswer = solveFirst(input);

console.log(firstAnswer);
