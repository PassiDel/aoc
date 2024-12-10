import { sumArray } from '../../utils/array.ts';

export function solveFirst(input: string): number {
  const finalPositions = decompressInput(input);

  let l = 0;
  let r = finalPositions.length - 1;
  while (l < r) {
    if (finalPositions[l] !== -1) {
      l++;
      continue;
    }

    if (finalPositions[r] === -1) {
      r--;
      continue;
    }

    finalPositions[l] = finalPositions[r];
    finalPositions[r] = -1;
    l++;
    r--;
  }

  return sumArray(finalPositions.map((v, i) => (v > 0 ? v * i : 0)));
}

function decompressInput(input: string) {
  const len = input.length;
  const finalPositions: number[] = [];

  for (let i = 0; i < len; i++) {
    const amount = Number(input[i]);

    const id = i % 2 === 0 ? Math.floor(i / 2) : -1;
    for (let j = 0; j < amount; j++) {
      finalPositions.push(id);
    }
  }
  return finalPositions;
}

function getSpaceMap(memory: number[]) {
  const spaces = Array.from({ length: 10 }, () => [] as number[]);

  let i = 0;
  while (i < memory.length) {
    if (memory[i] >= 0) {
      // not a space
      i++;
      continue;
    }

    let size = 0;
    while (memory[i] < 0) {
      size++;
      i++;
    }

    // push start position
    spaces[size].push(i - size);
  }

  return spaces;
}

export function solveSecond(input: string): number {
  const finalPositions = decompressInput(input);
  const spaces = getSpaceMap(finalPositions);

  // TODO: theres bug in her somewhere

  let moved: number[] = [];
  let r = finalPositions.length - 1;
  while (r > 0) {
    if (finalPositions[r] < 0) {
      // spaces can't be moved
      r--;
      continue;
    }

    let size = 0;
    const id = finalPositions[r];
    while (finalPositions[r] === id) {
      r--;
      size++;
    }

    const firstFreeSpaceSize = spaces.findIndex(
      (sp, si) => si >= size && sp.length > 0 && sp[0] < r
    );

    if (firstFreeSpaceSize < 0) {
      continue;
    }

    const spaceIdx = spaces[firstFreeSpaceSize].shift()!;

    if (moved.includes(id)) {
      continue;
    }
    moved.push(id);
    for (let i = 0; i < size; i++) {
      finalPositions[r + i + 1] = -1;
      finalPositions[spaceIdx + i] = id;
    }

    const spaceDiff = firstFreeSpaceSize - size;
    if (spaceDiff > 0) {
      spaces[spaceDiff].push(spaceIdx + firstFreeSpaceSize - spaceDiff);
      spaces[spaceDiff].sort((a, b) => a - b);
    }

    // r = position;
  }

  // console.log(finalPositions);

  return sumArray(finalPositions.map((v, i) => (v > 0 ? v * i : 0)));
}
