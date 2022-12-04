import { example, input } from './input'

const calcPriority = (input: string) => {
  if (input.charAt(0).toLowerCase() === input.charAt(0))
    return input.charCodeAt(0) - 96

  return input.charCodeAt(0) - 38
}

function isntNull(value: string[] | null): value is string[] {
  return value !== null
}

function intersectionOfSets<T>(set1: Set<T>, set2: Set<T>) {
  return [...set1].filter(item => set2.has(item))
}

const part1 = (data: string) => data.split('\n').map((line) => {
  const first = new Set(line.slice(0, line.length / 2))
  const second = new Set(line.slice(line.length / 2, line.length))
  const commonElements = intersectionOfSets(first, second)
  return commonElements.reduce<number>((acc, curr) => acc + calcPriority(curr), 0)
}).reduce<number>((acc, curr) => acc + curr, 0)

const part2 = (data: string) => {
  const lines = data.split('\n')
  const batches = lines.map((_, index) => {
    return index % 3 === 0 ? lines.slice(index, index + 3) : null
  }).filter(isntNull)

  return batches.reduce<number>((acc, curr) => {
    const first = new Set(curr[0] as unknown as string)
    const second = new Set(curr[1] as unknown as string)
    const third = new Set(curr[2] as unknown as string)

    const firstIntersection = [...first].filter(i => second.has(i))
    const common = firstIntersection.filter(i => third.has(i))
    return acc + calcPriority(common[0] as unknown as string)
  }, 0)
}
console.log(part2(input))
