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
