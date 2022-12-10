import { example, input } from './input'

type noopType = 'noop'
type addxType = `addx ${number}`

type parsedInstructions = { opcode: 'noop' } | { opcode: 'addx'; operand: number }

const isNoop = (value: string): value is noopType => value === 'noop'
const isAddxType = (value: string): value is addxType => value.startsWith('addx')

const parse = (rawInstructions: string): parsedInstructions[] => rawInstructions
  .split('\n')
  .map((line) => {
    if (isNoop(line))
      return { opcode: 'noop' }
    if (isAddxType(line))
      return { opcode: 'addx', operand: Number(line.slice('addx '.length)) }
    throw new Error('shouldnt happen')
  })

const calcScore = ({ cycle, score, registerX }: { cycle: number; score: number; registerX: number }) => [20, 60, 100, 140, 180, 220].includes(cycle) ? cycle * registerX + score : score

type cycleType = number

const part1 = (instructions: parsedInstructions[], returnStates = false) => {
  let cycle = 0
  let score = 0
  let registerX = 1

  const states: Map<cycleType, number> = new Map()

  for (const instruction of instructions) {
    if (instruction.opcode === 'noop') {
      cycle += 1
      states.set(cycle, registerX)
      score = calcScore({ cycle, score, registerX })
    }

    if (instruction.opcode === 'addx') {
      cycle += 1
      states.set(cycle, registerX)
      score = calcScore({ cycle, score, registerX })

      cycle += 1
      score = calcScore({ cycle, score, registerX })

      registerX += instruction.operand
      states.set(cycle, registerX)
    }
  }

  if (returnStates)
    return states
  return score
}

const part2 = (instructions: parsedInstructions[]) => {
  const states = part1(instructions, true)
  if (typeof states === 'number')
    throw new Error('shouldnt happen')

  for (let i = 1; i <= 240; i++) {
    const registerVal = states.get(i)
    if (registerVal === undefined)
      throw new Error(`shouldnt happen, cycle: ${i}, registerVal: ${registerVal}`)
    const offSetCycle = i % 40
    if (registerVal === offSetCycle || registerVal - 1 === offSetCycle || registerVal + 1 === offSetCycle)
      process.stdout.write('#')
    else
      process.stdout.write('.')

    if (i % 40 === 0)
      process.stdout.write('\n')
  }
}

console.log(part2(parse(input)))
