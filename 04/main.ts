import { example, input } from './input'

type pairType = `${number}-${number}`
type rangeType = `${pairType},${pairType}`

interface parsedType {
  first: {
    start: number
    end: number
  }
  second: {
    start: number
    end: number
  }
}

function isRangeType(line: string): line is rangeType {
  return /^\d+-\d+,\d+-\d+$/.test(line)
}

function parse(input: string) {
  return input.split('\n').filter(isRangeType).map((pairs) => {
    const [first, last] = pairs.split(',') as unknown as [pairType, pairType]

    const firstNumbers = first.split('-').map(Number) as unknown as [number, number]
    const parsedFirst = { start: firstNumbers[0], end: firstNumbers[1] }

    const lastNumbers = last.split('-').map(Number) as unknown as [number, number]
    const parsedLast = { start: lastNumbers[0], end: lastNumbers[1] }

    return { first: parsedFirst, second: parsedLast }
  })
}

function fullycontained(pair: parsedType, turnedAround = false): boolean {
  if (pair.first.start <= pair.second.start && pair.first.end >= pair.second.end)
    return true
  if (turnedAround === true)
    return false
  return fullycontained({ first: pair.second, second: pair.first }, true)
}

function part1(data: parsedType[]) {
  return data.reduce<number>((acc, cur) => {
    if (fullycontained(cur))
      return acc + 1

    return acc
  }, 0)
}

console.log(part1(parse(input)))
