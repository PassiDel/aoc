export function randomInt(fromInclusive: number, toExclusive: number): number {
  return (
    Math.floor(Math.random() * (toExclusive - fromInclusive)) + fromInclusive
  );
}
