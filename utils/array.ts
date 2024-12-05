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
