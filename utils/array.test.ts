import { describe, expect, it } from 'bun:test';
import {
  combinations,
  getMiddleElement,
  groupBy,
  multArray,
  multBy,
  replaceChar,
  sumArray,
  sumBy,
  unique
} from './array.ts';

describe('array utils', () => {
  it('sumArray number array', () => {
    const array = [1, 2, 3];
    const sum = sumArray(array);
    expect(sum).toBeNumber();
    expect(sum).toBeFinite();
    expect(sum).toBe(1 + 2 + 3);

    expect(sumArray([])).toBeNumber();
    expect(sumArray([])).toBeFinite();
    expect(sumArray([])).toBe(0);
  });
  it('sumArray read-only number array', () => {
    const array = [1, 2, 3] as const;
    const sum = sumArray(array);
    expect(sum).toBeNumber();
    expect(sum).toBeFinite();
    expect(sum).toBe(1 + 2 + 3);

    expect(sumArray([])).toBeNumber();
    expect(sumArray([])).toBeFinite();
    expect(sumArray([])).toBe(0);
  });
  it('sumBy number array', () => {
    const array = [1, 2, 3];
    const sum = sumBy(array, (e) => e);
    expect(sum).toBeNumber();
    expect(sum).toBeFinite();
    expect(sum).toBe(1 + 2 + 3);
  });
  it('sumBy read-only number array', () => {
    const array = [1, 2, 3] as const;
    const sum = sumBy(array, (e) => e);
    expect(sum).toBeNumber();
    expect(sum).toBeFinite();
    expect(sum).toBe(1 + 2 + 3);
  });
  it('sumBy mixed array', () => {
    const array = [1, '2', 3.1, ''];

    const sum = sumBy(array, (e) => e);
    expect(sum).toBeNumber();
    expect(sum).toBeFinite();
    expect(sum).toBe(1 + 2 + 3.1);
  });
  it('sumBy object array', () => {
    const array: (
      | { value: number | string }
      | { differentValue: number | string }
    )[] = [{ value: 3 }, { value: '2' }, { differentValue: '-2.44' }];

    const sum = sumBy(array, (e) =>
      'differentValue' in e ? e.differentValue : e.value
    );
    expect(sum).toBeNumber();
    expect(sum).toBeFinite();
    expect(sum).toBe(3 + 2 - 2.44);
  });
  it('sumBy empty array', () => {
    expect(sumBy([], (e) => e)).toBeNumber();
    expect(sumBy([], (e) => e)).toBeFinite();
    expect(sumBy([], (e) => e)).toBe(0);
  });

  it('multArray number array', () => {
    const array = [1, 2, 3];
    const sum = multArray(array);
    expect(sum).toBeNumber();
    expect(sum).toBeFinite();
    expect(sum).toBe(2 * 3);

    expect(multArray([])).toBeNumber();
    expect(multArray([])).toBeFinite();
    expect(multArray([])).toBe(0);
  });
  it('multArray read-only number array', () => {
    const array = [1, 2, 3] as const;
    const sum = multArray(array);
    expect(sum).toBeNumber();
    expect(sum).toBeFinite();
    expect(sum).toBe(2 * 3);

    expect(multArray([])).toBeNumber();
    expect(multArray([])).toBeFinite();
    expect(multArray([])).toBe(0);
  });
  it('multBy number array', () => {
    const array = [1, 2, 3];
    const sum = sumBy(array, (e) => e);
    expect(sum).toBeNumber();
    expect(sum).toBeFinite();
    expect(sum).toBe(1 + 2 + 3);
  });
  it('multBy read-only number array', () => {
    const array = [1, 2, 3] as const;
    const sum = multBy(array, (e) => e);
    expect(sum).toBeNumber();
    expect(sum).toBeFinite();
    expect(sum).toBe(1 + 2 + 3);
  });
  it('multBy mixed array', () => {
    const array = [1, '2', 3.1, ''];

    const sum = multBy(array, (e) => e);
    expect(sum).toBeNumber();
    expect(sum).toBeFinite();
    expect(sum).toBe(0);
  });
  it('multBy object array', () => {
    const array: (
      | { value: number | string }
      | { differentValue: number | string }
    )[] = [{ value: 3 }, { value: '2' }, { differentValue: '-2.44' }];

    const sum = multBy(array, (e) =>
      'differentValue' in e ? e.differentValue : e.value
    );
    expect(sum).toBeNumber();
    expect(sum).toBeFinite();
    expect(sum).toBe(3 * 2 * -2.44);
  });
  it('multBy empty array', () => {
    expect(multBy([], (e) => e)).toBeNumber();
    expect(multBy([], (e) => e)).toBeFinite();
    expect(multBy([], (e) => e)).toBe(0);
  });
  it('groupBy', () => {
    const arr = [0, 1, 2, 2, 1, 3];
    const actual = groupBy(arr, (e) => e);
    const expected = [
      { key: 0, elements: [0] },
      { key: 1, elements: [1, 1] },
      { key: 2, elements: [2, 2] },
      { key: 3, elements: [3] }
    ];

    expect(actual).toHaveLength(actual.length);
    expect(Object.keys(actual.map((e) => e.key))).toEqual(
      expect.arrayContaining(Object.keys(expected.map((e) => e.key)))
    );
    expected.forEach(({ key, elements }) => {
      const actualGroup = actual.find((e) => e.key === key);
      expect(actualGroup).toBeTruthy();
      expect(actualGroup).toBeObject();
      expect(actualGroup?.elements || []).toHaveLength(elements.length);
      expect(actualGroup?.elements || []).toEqual(
        expect.arrayContaining(elements)
      );
    });
  });
  it('getMiddleElement', () => {
    expect(getMiddleElement([1, 2, 3, 4])).toBe(3);
    expect(getMiddleElement([1, 2, 3])).toBe(2);
    expect(getMiddleElement([1])).toBe(1);
    expect(getMiddleElement([])).toBeUndefined();
  });
  it('combinations', () => {
    const numbers = [0, 1, 2];
    const n = numbers.length;
    const actual = combinations(numbers);
    const expected = [
      { a: 0, b: 1 },
      { a: 0, b: 2 },
      { a: 1, b: 0 },
      { a: 1, b: 2 },
      { a: 2, b: 0 },
      { a: 2, b: 1 }
    ];
    expect(actual).toHaveLength(n * (n - 1));
    expect(actual).toEqual(expect.arrayContaining(expected));
    expect(expected).toEqual(expect.arrayContaining(actual));
  });
  it('unique numbers', () => {
    const arr = [0, 1, 2, 2, 1, 3];
    const actual = arr.filter(unique());
    const expected = [0, 1, 2, 3];

    expect(actual).toHaveLength(actual.length);
    expect(actual).toEqual(expect.arrayContaining(expected));
    expect(expected).toEqual(expect.arrayContaining(actual));
  });
  it('unique objects', () => {
    const arr = [{ a: 0 }, { a: 1 }, { a: 2 }, { a: 2 }, { a: 1 }, { a: 3 }];
    const actual = arr.filter(unique((a, b) => a.a === b.a));
    const expected = [{ a: 0 }, { a: 1 }, { a: 2 }, { a: 3 }];

    expect(actual).toHaveLength(actual.length);
    expect(actual).toEqual(expect.arrayContaining(expected));
    expect(expected).toEqual(expect.arrayContaining(actual));

    // should just pass everything through since objects equality check is by reference
    expect(arr.filter(unique())).toHaveLength(arr.length);
  });
  it('replaceChar', () => {
    const input = `000000
111111
222222
333333`;
    const rows = input.split('\n');
    replaceChar(rows, 1, 2, 'b');
    const actual = rows.join('\n');
    const expected = `000000
111111
2b2222
333333`;

    expect(actual).toHaveLength(expected.length);
    expect(actual).toEqual(expected);
  });
});
