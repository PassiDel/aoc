import { type Arith, init } from 'z3-solver';

import { readFile } from 'fs/promises';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { parseInput } from './index.ts';

if (globalThis.Bun !== undefined) {
  console.error('This only runs with node!');
  process.exit(1);
}

const data = await readFile(
  join(dirname(fileURLToPath(import.meta.url)), 'input.txt'),
  'utf8'
);
const cleanData = parseInput(data.trim());

const { Context } = await init();
const counts = await Promise.all(
  cleanData.map(async ({ buttons, joltage }) => {
    const { Optimize, Int } = Context('main');

    const bbtns = buttons.map((b) =>
      new Array(joltage.length).fill(0).map((_, i) => (b.includes(i) ? 1 : 0))
    );
    const solver = new Optimize();

    const vars = bbtns.map((_, i) => {
      const v = Int.const(i.toString());
      solver.add(v.ge(0));

      return v;
    });

    joltage.forEach((vol, i) => {
      const condition = bbtns.reduce(
        (cond, btn, y) => (btn[i] === 1 ? cond.add(vars[y]) : cond),
        Int.val(0) as Arith
      );

      solver.add(condition.eq(Int.val(vol)));
    });

    const sumVars = vars.reduce((a, v) => a.add(v), Int.val(0));

    solver.minimize(sumVars);

    const result = await solver.check();
    if (result === 'sat') {
      return Number(solver.model().eval(sumVars).toString());
    }
    return 0;
  })
);

console.log(counts.reduce((a, c) => a + c, 0));
