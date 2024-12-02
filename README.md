# Advent of Code

![Check runs](https://img.shields.io/github/check-runs/PassiDel/aoc/main)
![Typescript version](https://img.shields.io/github/package-json/dependency-version/passidel/aoc/peer/typescript)
![Runtime Bun](<https://img.shields.io/badge/bun-pink?logo=bun&label=runtime&labelColor=black&color=rgb(244,114,182)>)

> [LANGUAGE: TypeScript]
>
> [RUNTIME: Bun]

## Structure

Every solution is grouped by its year and day and (usually) consists of five files:

| Filename                            | Purpose                                                                                                 |
| ----------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `<year>/<day>/index.ts`             | Has the solution. Exports two functions: `solveFirst(string): number` and `solveSecond(string): number` |
| `<year>/<day>/index.test.ts`        | Unit test using the example input and expected solution.                                                |
| `<year>/<day>/run.ts`               | Basic run script: Loading the actual input and passing it into the two solve functions.                 |
| `<year>/<day>/input.txt`            | Input text from AOC.                                                                                    |
| `<year>/<day>/<year>-<day>.run.xml` | IntelliJ/Webstorm runfile for `run.ts` using Bun.                                                       |

## Setup

To install dependencies:

```bash
bun install
```

To test all days:

```bash
bun run test
```

To create a new day-folder:

```bash
bun run copy.ts
```

To run a single day, first copy your input file from `https://adventofcode.com/<year>/day/<day>/input` into
`<year>/<day>/input.txt`. Then run:

```bash
bun run <year>/<day>/run.ts
```
