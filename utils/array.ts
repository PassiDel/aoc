/**
 * Returns the sum of all the elements of a numeric array.
 * @param arr Numeric array.
 */
export function sumArray(arr: ReadonlyArray<number>): number {
  return sumBy(arr, (a) => a);
}

/**
 * Returns the sum of all the elements of any array,
 * given a lamda function to receive the numeric representation of each element.
 * @param arr Any array.
 * @param by Map element to number or string, which will be interpreted as a number.
 */
export function sumBy<E>(
  arr: ReadonlyArray<E>,
  by: (element: E) => number | string
): number {
  return arr.reduce((sum, element) => sum + Number(by(element)), 0);
}

/**
 * Returns the product of a numeric array.
 * @param arr Numeric array.
 */
export function multArray(arr: ReadonlyArray<number>): number {
  return multBy(arr, (a) => a);
}

/**
 * Returns the product of any array,
 * given a lamda function to receive the numeric representation of each element.
 * @param arr Any array.
 * @param by Map element to number or string, which will be interpreted as a number.
 */
export function multBy<E>(
  arr: ReadonlyArray<E>,
  by: (element: E) => number | string
): number {
  if (arr.length <= 0) {
    return 0;
  }
  return arr.reduce((sum, element) => sum * Number(by(element)), 1);
}

/**
 * Group an array by a given key.
 * @param arr Any array.
 * @param by Map element to key.
 * @param equals Check if two keys are identical. Defaults to strict equality.
 */
export function groupBy<E, K>(
  arr: ReadonlyArray<E>,
  by: (element: E) => K,
  equals: (a: K, b: K) => boolean = (a, b) => a === b
): { key: K; elements: Array<E> }[] {
  return arr.reduce(
    (groups, element) => {
      const key = by(element);
      const index = groups.findIndex((e) => equals(e.key, key));

      if (index < 0) {
        // New key found, add to group array.
        groups.push({ key, elements: [element] });
        return groups;
      }

      const existing = groups[index];
      existing.elements.push(element);

      return groups;
    },
    [] as { key: K; elements: Array<E> }[]
  );
}

/**
 * Return the middle Element of an array, rounding up.
 * Returns undefined for empty arrays without throwing!
 *
 * @example
 * ```typescript
 * getMiddleElement([1, 2, 3, 4]) === 3
 * getMiddleElement([1, 2, 3]) === 2
 * getMiddleElement([1]) === 1
 * getMiddleElement([]) === undefined
 * ```
 * @param arr
 */
export function getMiddleElement<E>(arr: ReadonlyArray<E>) {
  return arr[Math.floor(arr.length / 2)];
}

/**
 * Returns an array with every combination of every element in an array.
 * The combination array will have a length of `n * (n-1)` for an array of length `n`.
 * @example
 * ```typescript
 * const arr = [0, 1, 2]
 *
 * combinations(arr) === [
 *  {a: 0, b: 1},
 *  {a: 0, b: 2},
 *  {a: 1, b: 0},
 *  {a: 1, b: 2},
 *  {a: 2, b: 0},
 *  {a: 2, b: 1},
 * ]
 * ```
 * @param arr
 */
export function combinations<E>(arr: ReadonlyArray<E>): { a: E; b: E }[] {
  return arr
    .flatMap((a, _, arr) => arr.flatMap((b) => (a !== b ? [{ a, b }] : null)))
    .filter((c) => !!c);
}

/**
 * Returns an array with every unique combination of every element in an array.
 * The combination array will have a length of `n! / ((n-2)! * 2)` for an array of length `n`.
 * @example
 * ```typescript
 * const arr = [0, 1, 2]
 *
 * combinations(arr) === [
 *  {a: 0, b: 1},
 *  {a: 0, b: 2},
 *  {a: 1, b: 2}
 * ]
 * ```
 * @param arr
 */
export function uniqueCombinations<E>(arr: ReadonlyArray<E>): { a: E; b: E }[] {
  return arr.flatMap((a, aI) =>
    arr.flatMap((b, bI) => (a !== b && aI > bI ? [{ a, b }] : []))
  );
}
export function uniqueIndexCombinations<E>(
  arr: ReadonlyArray<E>
): { aI: number; bI: number }[] {
  return arr.flatMap((a, aI) =>
    arr.flatMap((b, bI) => (a !== b && aI > bI ? [{ aI, bI }] : []))
  );
}

/**
 * Returns a filter lambda to be used in array.filter() to only allow the
 * first occurrence of duplicate values.
 * @param isEqual Custom equality check, defaults to `a === b`
 */
export function unique<E>(
  isEqual: (a: E, b: E) => boolean = (a, b) => a === b
) {
  return (self: E, index: number, arr: ReadonlyArray<E>) =>
    arr.findIndex((v) => isEqual(v, self)) === index;
}

/**
 * Replace a char in a two-dimensional array of strings.
 * @param arr two-dimensional string array
 * @param x column
 * @param y row
 * @param char Char
 */
export function replaceChar(arr: string[], x: number, y: number, char: string) {
  arr[y] = arr[y].substring(0, x) + char + arr[y].substring(x + char.length);
}
