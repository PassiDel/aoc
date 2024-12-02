import { describe, expect, it } from 'bun:test';
import { solveFirst } from './index.ts';

describe('2023-25', () => {
  it('first', () => {
    const testInput = `jqt: rhn xhk nvd
rsh: frs pzl lsr
xhk: hfx
cmg: qnr nvd lhk bvb
rhn: xhk bvb hfx
bvb: xhk hfx
pzl: lsr hfx nvd
qnr: nvd
ntq: jqt hfx bvb xhk
nvd: lhk
lsr: lhk
rzs: qnr cmg lsr rsh
frs: qnr lhk lsr`;
    expect(solveFirst(testInput)).toBe(54);
  });
});
