const isSafe = (numbers: number[]) => {
  const increasing = numbers[1] - numbers[0];

  for (let i = 1; i < numbers.length; i++) {
    const signedDiff = numbers[i] - numbers[i - 1];
    if (signedDiff < 0 !== increasing < 0) {
      return false;
    }

    const diff = Math.abs(signedDiff);
    if (diff < 1 || diff > 3) {
      return false;
    }
  }

  return true;
};

export function solveFirst(input: string): number {
  const lines = input.split('\n').map((line) => line.split(' ').map(Number));

  return lines.filter(isSafe).length;
}

export function solveSecond(input: string): number {
  const lines = input.split('\n').map((line) => line.split(' ').map(Number));

  const safe = lines.filter((numbers) => {
    if (isSafe(numbers)) {
      return true;
    }

    for (let i = 0; i < numbers.length; i++) {
      if (isSafe(numbers.toSpliced(i, 1))) {
        return true;
      }
    }

    return false;
  });

  return safe.length;
}
