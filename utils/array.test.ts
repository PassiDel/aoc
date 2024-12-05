import { describe, expect, it } from 'bun:test';
import {
  getMiddleElement,
  multArray,
  multBy,
  sumArray,
  sumBy
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
  it('getMiddleElement', () => {
    expect(getMiddleElement([1, 2, 3, 4])).toBe(3);
    expect(getMiddleElement([1, 2, 3])).toBe(2);
    expect(getMiddleElement([1])).toBe(1);
    expect(getMiddleElement([])).toBeUndefined();
  });
});
