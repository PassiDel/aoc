import { unsignedXOR } from '../../utils/numbers.ts';

const Instructions = {
  adv: 0,
  bxl: 1,
  bst: 2,
  jnz: 3,
  bxc: 4,
  out: 5,
  bdv: 6,
  cdv: 7
} as const;

type Instruction = (typeof Instructions)[keyof typeof Instructions];

function runCode(
  instructions: Instruction[],
  regA: number,
  regB: number,
  regC: number
) {
  let instructionPointer = 0;
  const output: number[] = [];

  while (instructionPointer < instructions.length) {
    let instruction = instructions[instructionPointer];
    let operand = instructions[instructionPointer + 1];
    let comboOperand: number = operand;
    if (operand === 4) {
      comboOperand = regA;
    } else if (operand === 5) {
      comboOperand = regB;
    } else if (operand === 6) {
      comboOperand = regC;
    }

    let jumped = false;
    // console.log(regA, regB, regC, instruction, operand);
    switch (instruction) {
      case Instructions.adv:
        regA = Math.floor(regA / Math.pow(2, comboOperand));
        break;
      case Instructions.bdv:
        regB = Math.floor(regA / Math.pow(2, comboOperand));
        break;
      case Instructions.cdv:
        regC = Math.floor(regA / Math.pow(2, comboOperand));
        break;
      case Instructions.bxl:
        regB = unsignedXOR(regB, operand);
        break;
      case Instructions.bst:
        regB = comboOperand % 8;
        break;
      case Instructions.jnz:
        if (regA !== 0) {
          instructionPointer = operand;
          jumped = true;
        }
        break;
      case Instructions.bxc:
        regB = unsignedXOR(regB, regC);
        break;
      case Instructions.out:
        output.push(comboOperand % 8);
        break;
    }
    if (!jumped) {
      instructionPointer += 2;
    }
  }

  return output.join(',');
}

export function solveFirst(input: string): string {
  const match = input.match(
    /^Register A: (\d*)\nRegister B: (\d*)\nRegister C: (\d*)\n\nProgram: ([\d,]*)$/m
  );
  if (!match) {
    return '';
  }

  const instructions = match[4].split(',').map(Number) as Instruction[];
  return runCode(
    instructions,
    Number(match[1]),
    Number(match[2]),
    Number(match[3])
  );
}

export function solveSecond(input: string): number {
  const match = input.match(
    /^Register A: (\d*)\nRegister B: (\d*)\nRegister C: (\d*)\n\nProgram: ([\d,]*)$/m
  );
  if (!match) {
    return 0;
  }

  const instructions = match[4].split(',').map(Number) as Instruction[];

  const regB = Number(match[2]);
  const regC = Number(match[3]);

  const possible: { result: string; length: number }[] = [];
  possible.push({ result: '', length: 0 });
  while (possible.length) {
    const { result, length } = possible.shift()!;
    if (length === instructions.length) {
      return parseInt(result, 2);
    }
    const from = parseInt(`${result}000`, 2);
    const to = parseInt(`${result}111`, 2);

    const expect = instructions.slice(-(length + 1)).join(',');
    for (let regA = from; regA <= to; regA++) {
      const r = runCode(instructions, regA, regB, regC);
      if (r === expect) {
        possible.push({ result: regA.toString(2), length: length + 1 });
      }
    }
  }

  return 0;
}
