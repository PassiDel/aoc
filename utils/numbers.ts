export function mod(x: number, m: number) {
  return ((x % m) + m) % m;
}

export function unsignedXOR(a: number, b: number) {
  return (a ^ b) >>> 0;
}
