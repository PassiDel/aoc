import { replaceChar, sumArray } from '../../utils/array.ts';
import {
  type Coordinates,
  findCoordsOfDigit,
  getAdjacent,
  isCoordinateEqual
} from '../../utils/coordinates.ts';

// TODO: cleanup??
export function solveFirst(input: string): number {
  const [rawMap, rawInstructions] = input.split('\n\n');
  const map = rawMap.split('\n');
  const instructions = rawInstructions.split('\n').join('');

  // console.log(map);
  // console.log(instructions);

  const width = map[0].length;
  const height = map.length;

  let [[x, y]] = findCoordsOfDigit(map, '@');

  replaceChar(map, x, y, '.');

  outer: for (const instruction of instructions) {
    // console.log(instruction, x, y);
    const { left, right, down, top } = getAdjacent(map, x, y);

    if (instruction === '>') {
      if (right === '#') {
        continue;
      }
      if (right === '.') {
        x++;
        continue;
      }
      if (right === 'O') {
        let firstFree = 2;
        while (firstFree + x < width) {
          if (map[y][firstFree + x] === '#') {
            continue outer;
          }
          if (map[y][firstFree + x] === '.') {
            break;
          }
          firstFree++;
        }
        if (firstFree + x >= width) {
          continue;
        }
        replaceChar(map, x + 1, y, '.');
        replaceChar(map, x + firstFree, y, 'O');

        x++;
        continue;
      }
    } else if (instruction === 'v') {
      if (down === '#') {
        continue;
      }
      if (down === '.') {
        y++;
        continue;
      }

      if (down === 'O') {
        let firstFree = 2;
        while (firstFree + y < height) {
          if (map[firstFree + y][x] === '#') {
            continue outer;
          }
          if (map[firstFree + y][x] === '.') {
            break;
          }
          firstFree++;
        }
        if (firstFree + y >= height) {
          continue;
        }
        replaceChar(map, x, y + 1, '.');
        replaceChar(map, x, y + firstFree, 'O');

        y++;
        continue;
      }
    } else if (instruction === '<') {
      if (left === '#') {
        continue;
      }
      if (left === '.') {
        x--;
        continue;
      }
      if (left === 'O') {
        let firstFree = -2;
        while (firstFree + x > 0) {
          if (map[y][firstFree + x] === '#') {
            continue outer;
          }
          if (map[y][firstFree + x] === '.') {
            break;
          }
          firstFree--;
        }
        if (firstFree + x <= 0) {
          continue;
        }
        replaceChar(map, x - 1, y, '.');
        replaceChar(map, x + firstFree, y, 'O');

        x--;
        continue;
      }
    } else if (instruction === '^') {
      if (top === '#') {
        continue;
      }
      if (top === '.') {
        y--;
        continue;
      }

      if (top === 'O') {
        let firstFree = -2;
        while (firstFree + y > 0) {
          if (map[firstFree + y][x] === '#') {
            continue outer;
          }
          if (map[firstFree + y][x] === '.') {
            break;
          }
          firstFree--;
        }
        if (firstFree + y <= 0) {
          continue;
        }
        replaceChar(map, x, y - 1, '.');
        replaceChar(map, x, y + firstFree, 'O');

        y--;
        continue;
      }
    }
    console.log('ERROR!');
    break;
  }

  // console.log(map.join('\n'));

  const boxes = findCoordsOfDigit(map, 'O');

  return sumArray(boxes.map(([x, y]) => 100 * y + x));
}

export function solveSecond(input: string): number {
  const [rawMap, rawInstructions] = input.split('\n\n');
  const map = rawMap.split('\n').map((row) =>
    row
      .split('')
      .map((d) => (d === 'O' ? '[]' : d === '@' ? '@.' : d + d))
      .join('')
  );
  const instructions = rawInstructions.split('\n').join('');

  // console.log(map);
  // console.log(instructions);

  const width = map[0].length;

  let [[x, y]] = findCoordsOfDigit(map, '@');

  replaceChar(map, x, y, '.');

  outer: for (const instruction of instructions) {
    if (map.some((r) => r.includes('[[') || r.includes(']]'))) {
      console.log('ERROR!');
      replaceChar(map, x, y, '@');
      break;
    }

    // console.log(map.join('\n'));
    // console.log(instruction, x, y);
    const { left, right, down, top } = getAdjacent(map, x, y);

    if (instruction === '>') {
      if (right === '#') {
        continue;
      }
      if (right === '.') {
        x++;
        continue;
      }

      if (right === '[') {
        let firstFree = 3;
        while (firstFree + x < width) {
          if (map[y][firstFree + x] === '#') {
            continue outer;
          }
          if (map[y][firstFree + x] === '.') {
            break;
          }
          firstFree++;
        }
        if (firstFree + x >= width) {
          continue;
        }
        const boxes = map[y].substring(x + 1, x + firstFree);
        replaceChar(map, x + 2, y, boxes);
        replaceChar(map, x + 1, y, '.');

        x++;
        continue;
      }
    } else if (instruction === 'v') {
      if (down === '#') {
        continue;
      }
      if (down === '.') {
        y++;
        continue;
      }
      const toMove: Coordinates = [];
      const toMoveDigit: string[] = [];
      if (down === ']') {
        toMove.push([x, y + 1], [x - 1, y + 1]);
        toMoveDigit.push(']', '[');
      } else if (down === '[') {
        toMove.push([x, y + 1], [x + 1, y + 1]);
        toMoveDigit.push('[', ']');
      }
      for (let i = 0; i < toMove.length; i++) {
        const [mX, mY] = toMove[i];
        const { down: mDown } = getAdjacent(map, mX, mY);
        if (!mDown) {
          continue;
        }
        if (mDown === '[') {
          toMove.push([mX, mY + 1], [mX + 1, mY + 1]);
          toMoveDigit.push('[', ']');
        } else if (mDown === ']') {
          toMove.push([mX - 1, mY + 1], [mX, mY + 1]);
          toMoveDigit.push('[', ']');
        }
      }
      // TODO: filter unique??
      // console.log(toMove);

      if (toMove.some(([mX, mY]) => map[mY + 1][mX] === '#')) {
        continue;
      }
      // console.log('move', 1);
      toMove.forEach(([mX, mY], i) =>
        replaceChar(map, mX, mY + 1, toMoveDigit[i])
      );
      toMove.forEach(
        ([mX, mY]) =>
          !toMove.some((c) => isCoordinateEqual(c, [mX, mY - 1])) &&
          replaceChar(map, mX, mY, '.')
      );
      y++;
      continue;
    } else if (instruction === '<') {
      if (left === '#') {
        continue;
      }
      if (left === '.') {
        x--;
        continue;
      }
      if (left === ']') {
        let firstFree = -3;
        while (firstFree + x > 0) {
          if (map[y][firstFree + x] === '#') {
            continue outer;
          }
          if (map[y][firstFree + x] === '.') {
            break;
          }
          firstFree--;
        }
        if (firstFree + x <= 0) {
          continue;
        }
        const boxes = map[y].substring(x + firstFree + 1, x);
        replaceChar(map, x + firstFree, y, boxes);
        replaceChar(map, x - 1, y, '.');

        x--;
        continue;
      }
    } else if (instruction === '^') {
      if (top === '#') {
        continue;
      }
      if (top === '.') {
        y--;
        continue;
      }
      const toMove: Coordinates = [];
      const toMoveDigit: string[] = [];
      if (top === ']') {
        toMove.push([x, y - 1], [x - 1, y - 1]);
        toMoveDigit.push(']', '[');
      } else if (top === '[') {
        toMove.push([x, y - 1], [x + 1, y - 1]);
        toMoveDigit.push('[', ']');
      }

      for (let i = 0; i < toMove.length; i++) {
        const [mX, mY] = toMove[i];
        const { top: mTop } = getAdjacent(map, mX, mY);
        if (!mTop) {
          continue;
        }
        if (mTop === '[') {
          toMove.push([mX, mY - 1], [mX + 1, mY - 1]);
          toMoveDigit.push('[', ']');
        } else if (mTop === ']') {
          toMove.push([mX - 1, mY - 1], [mX, mY - 1]);
          toMoveDigit.push('[', ']');
        }
      }
      // TODO: filter unique??
      // console.log(toMove);

      if (toMove.some(([mX, mY]) => map[mY - 1][mX] === '#')) {
        continue;
      }
      // console.log('move', 1);
      toMove.forEach(([mX, mY], i) =>
        replaceChar(map, mX, mY - 1, toMoveDigit[i])
      );
      toMove.forEach(
        ([mX, mY]) =>
          !toMove.some((c) => isCoordinateEqual(c, [mX, mY + 1])) &&
          replaceChar(map, mX, mY, '.')
      );
      y--;
      continue;
    }
    console.log('ERROR!');
    break;
  }

  // console.log(map.join('\n'));

  const boxes = findCoordsOfDigit(map, /\[/g);

  return sumArray(boxes.map(([x, y]) => 100 * y + x));
}
