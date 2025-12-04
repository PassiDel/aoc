import { replaceChar } from '../../utils/array.ts';
import { findCoordsOfDigit, getAdjacent } from '../../utils/coordinates.ts';

const PAPER_ROLL = '@';
export function solveFirst(input: string): number {
  const rows = input.split('\n');

  const rolls = findCoordsOfDigit(rows, PAPER_ROLL).filter(
    ([x, y]) =>
      Object.values(getAdjacent(rows, x, y)).filter((n) => n === PAPER_ROLL)
        .length < 4
  );
  return rolls.length;
}

export function solveSecond(input: string): number {
  const rows = input.split('\n');

  let removed = 0;

  let removedInStep = 0;
  do {
    removedInStep = 0;
    findCoordsOfDigit(rows, PAPER_ROLL).forEach(([x, y]) => {
      if (
        Object.values(getAdjacent(rows, x, y)).filter((n) => n === PAPER_ROLL)
          .length < 4
      ) {
        removedInStep++;
        replaceChar(rows, x, y, 'X');
      }
    });
    removed += removedInStep;
  } while (removedInStep > 0);

  return removed;
}
