export type Coordinate = [number, number];
export type Coordinates = Coordinate[];

/**
 * Returns a filter lambda to be used in array.filter() on a xy-Coordinate array (array of two number arrays).
 * @param xMax Exclusive
 * @param yMax Exclusive
 * @param xMin Inclusive, defaults to 0
 * @param yMin Inclusive, defaults to 0
 */
export function inBounds(xMax: number, yMax: number, xMin = 0, yMin = 0) {
  return ([x, y]: Readonly<Coordinate>) =>
    x >= xMin && x < xMax && y >= yMin && y < yMax;
}

/**
 * Check the equality of two xy-coordinates. Checks both x and y independently for number equality.
 * @param a xy-Coordinate, two number array
 * @param b xy-Coordinate, two number array
 */
export function isCoordinateEqual(
  a: Readonly<Coordinate>,
  b: Readonly<Coordinate>
): boolean {
  return b[0] === a[0] && b[1] === a[1];
}

export type DirectNeighbours = 'top' | 'left' | 'right' | 'down';

export type DiagonalNeighbours =
  | 'topLeft'
  | 'topRight'
  | 'downLeft'
  | 'downRight';

/**
 * Get all eight adjacent cells from a starting cell.
 * Returns undefined, when the cell is invalid (out of bounds).
 * @param rows Input xy-Matrix, string array
 * @param startX Center cell x Coordinate
 * @param startY Center cell y Coordinate
 */
export function getAdjacent(
  rows: string[],
  startX: number,
  startY: number
): Record<DirectNeighbours | DiagonalNeighbours, string | undefined> {
  const top = rows[startY - 1]?.[startX];
  const right = rows[startY]?.[startX + 1];
  const down = rows[startY + 1]?.[startX];
  const left = rows[startY]?.[startX - 1];

  const topLeft = rows[startY - 1]?.[startX - 1];
  const topRight = rows[startY - 1]?.[startX + 1];
  const downLeft = rows[startY + 1]?.[startX - 1];
  const downRight = rows[startY + 1]?.[startX + 1];

  return { top, right, left, down, topLeft, topRight, downLeft, downRight };
}

/**
 * Find all xy-Coordinates of a digit or custom regex match.
 * @param rows Input xy-Matrix, string array
 * @param digit Digit to search for, or custom regex pattern
 */
export function findCoordsOfDigit(
  rows: string[],
  digit: string | RegExp
): Coordinates {
  return rows.reduce<Coordinates>(
    (coords, row, y) =>
      row
        .matchAll(typeof digit === 'string' ? new RegExp(digit, 'g') : digit)
        .reduce(
          (coordinates, m) => [...coordinates, [m.index, y] as Coordinate],
          coords
        ),
    []
  );
}
