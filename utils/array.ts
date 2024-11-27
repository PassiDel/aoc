export function sumArray(arr: Array<number>): number {
  return sumBy(arr, (a) => a);
}

export function sumBy<T>(
  arr: Array<T>,
  by: (array: T) => number | string
): number {
  return arr.reduce((sum, element) => sum + Number(by(element)), 0);
}

export function multArray(arr: Array<number>): number {
  return multBy(arr, (a) => a);
}

export function multBy<T>(
  arr: Array<T>,
  by: (array: T) => number | string
): number {
  if (arr.length <= 0) {
    return 0;
  }
  return arr.reduce((sum, element) => sum * Number(by(element)), 1);
}

export function groupBy<E, K>(
  arr: Array<E>,
  by: (element: E) => K
): { key: K; elements: Array<E> }[] {
  return arr.reduce(
    (groups, element) => {
      const key = by(element);
      const index = groups.findIndex((e) => e.key === key);

      if (index < 0) {
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
