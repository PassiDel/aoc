/**
 * Returns a random integer between from and to, including from, excluding to.
 * @param fromInclusive Lower bound, inclusive.
 * @param toExclusive Upper Bound, exclusive.
 */
export function randomInt(fromInclusive: number, toExclusive: number): number {
  return (
    Math.floor(Math.random() * (toExclusive - fromInclusive)) + fromInclusive
  );
}
