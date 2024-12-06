import { availableParallelism } from 'os';
import pLimit from 'p-limit';
import { join } from 'path';
import { sumArray } from '../../utils/array.ts';

const workerFile = new URL('worker.ts', import.meta.url).href;

const eva = (i: number) =>
  new Promise<number>((resolve) => {
    const worker = new Worker(workerFile);

    worker.postMessage(i);
    worker.onmessage = (event) => {
      console.log('row:', i, 'found', event.data);
      resolve(event.data as number);
    };
  });

const input = await Bun.file(join(__dirname, 'input.txt')).text();
const rowCount = input.split('\n').length;

const work = new Array(rowCount).fill(0).map((_, i) => i);

const limit = pLimit(availableParallelism());
const solution = await Promise.all(work.map((w) => limit(eva, w)));

console.log(solution);

console.log(sumArray(solution));
