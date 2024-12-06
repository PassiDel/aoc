import { join } from 'path';
import { solveRow } from './index.ts';

declare var self: Worker;

const input = await Bun.file(join(__dirname, 'input.txt')).text();

self.onmessage = (event) => {
  const row = event.data as number;

  console.log('Start row', row);

  const rows = input.split('\n');

  const y = rows.findIndex((r) => r.indexOf('^') >= 0);
  const x = rows[y].indexOf('^');
  const direction = 0;

  postMessage(solveRow(rows, row, x, y, direction));
  process.exit();
};
