import { describe, expect, it } from 'bun:test';
import { randomInt } from './random.ts';

describe('random utils', () => {
  it('randomInt', () => {
    const from = -2;
    const to = 6;
    for (let i = 0; i < 20; i++) {
      const number = randomInt(from, to);
      expect(number).toBeNumber();
      expect(number).toBeFinite();
      expect(number).toBeInteger();
      expect(number).toBeGreaterThanOrEqual(from);
      expect(number).toBeLessThan(to);
    }
  });
});
