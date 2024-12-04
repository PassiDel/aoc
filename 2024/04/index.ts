import { sumArray } from '../../utils/array.ts';

export function solveFirst(input: string): number {
  const regex = /XMAS/g;
  const regexBackwards = /SAMX/g;

  const cForwards = [...input.matchAll(regex)].length;
  const cBackwards = [...input.matchAll(regexBackwards)].length;

  const rows = input.split('\n');
  const columns = rows.reduce<string[]>((columns, row) => {
    row
      .split('')
      .forEach((char, i) => (columns[i] = (columns[i] || '') + char));
    return columns;
  }, []);

  const cColumns = sumArray(
    columns.map(
      (column) =>
        [...column.matchAll(regex), ...column.matchAll(regexBackwards)].length
    )
  );

  const rowCount = rows.length - 1;

  const diagonals = rows.reduce<string[]>((diagonals, row, rowIndex) => {
    row
      .split('')
      .forEach(
        (char, columnIndex) =>
          (diagonals[columnIndex + (rowCount - rowIndex)] =
            (diagonals[columnIndex + (rowCount - rowIndex)] || '') + char)
      );
    return diagonals;
  }, []);

  const diagonals2 = rows.reduce<string[]>((diagonals, row, rowIndex) => {
    row
      .split('')
      .forEach(
        (char, columnIndex) =>
          (diagonals[columnIndex + rowIndex] =
            (diagonals[columnIndex + rowIndex] || '') + char)
      );
    return diagonals;
  }, []);

  const cDiagonals = sumArray(
    diagonals.map(
      (column) =>
        [...column.matchAll(regex), ...column.matchAll(regexBackwards)].length
    )
  );

  const cDiagonals2 = sumArray(
    diagonals2.map(
      (column) =>
        [...column.matchAll(regex), ...column.matchAll(regexBackwards)].length
    )
  );

  return cForwards + cBackwards + cColumns + cDiagonals + cDiagonals2;
}

export function solveSecond(input: string): number {
  const rows = input.split('\n');

  const rowCount = rows.length;
  const columnCount = rows[0].length;

  let found = 0;
  for (let y = 0; y < rowCount - 2; y++) {
    for (let x = 0; x < columnCount - 2; x++) {
      const diag = rows[y][x] + rows[y + 1][x + 1] + rows[y + 2][x + 2];
      const diag2 = rows[y + 2][x] + rows[y + 1][x + 1] + rows[y][x + 2];
      if (
        (diag === 'MAS' || diag === 'SAM') &&
        (diag2 === 'MAS' || diag2 === 'SAM')
      ) {
        found++;
      }
    }
  }

  return found;
}
