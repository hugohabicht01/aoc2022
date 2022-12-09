import { example, input } from './input'

const parse = (data: string) => data
  .split('\n')
  .map(l => l.split(''))
  .map(l => l.map(Number))

const assertIsDefined = <T>(value: T | undefined): T => {
  if (value === undefined)
    throw new Error('value was supposed to be defined')
  return value
}

const numsAbove = (grid: readonly number[][], x: number, y: number) => Array.from({ length: y }).map((_, i) => assertIsDefined(grid[i]?.[x]))

const numsRightOf = (grid: readonly number[][], x: number, y: number) => Array.from({ length: assertIsDefined(grid[0]).length - x - 1 }).map((_, i) => assertIsDefined(grid[y]?.[x + i + 1]))

const numsLeftOf = (grid: readonly number[][], x: number, y: number) => Array.from({ length: x }).map((_, i) => assertIsDefined(grid[y]?.[i]))

const numsBelow = (grid: readonly number[][], x: number, y: number) => Array.from({ length: grid.length - y - 1 }).map((_, i) => assertIsDefined(grid[y + i + 1]?.[x]))

const isOnEdge = (grid: readonly number[][], x: number, y: number) => x === 0 || y === 0 || y === (grid.length - 1) || x === (assertIsDefined(grid[0]).length - 1)

const isVisible = (grid: readonly number[][], x: number, y: number): boolean => {
  if (isOnEdge(grid, x, y))
    return true
  const value = assertIsDefined(grid[y]?.[x])

  const valuesAround = [
    numsAbove(grid, x, y),
    numsBelow(grid, x, y),
    numsRightOf(grid, x, y),
    numsLeftOf(grid, x, y),

  ]
  return valuesAround
    .reduce((visible, trees) => trees
      .reduce((highest, tree) => tree >= value ? tree : highest, 0) < value || visible, false)
}

const part1 = (grid: readonly number[][]) => grid
  .reduce<number>((totalAmount, line, yIndex) => totalAmount + line
    .reduce<number>((lineAmount, _, xIndex) => isVisible(grid, xIndex, yIndex) ? lineAmount + 1 : lineAmount, 0), 0)

console.log(part1(parse(input)))
