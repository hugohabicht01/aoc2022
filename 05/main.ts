/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { example, input } from './input'

class Stack<T> {
  private items: T[] = []

  push(item: T) {
    this.items.push(item)
  }

  pop(): T | undefined {
    return this.items.pop()
  }

  peek(): T | undefined {
    return this.items[this.items.length - 1]
  }

  get length(): number {
    return this.items.length
  }

  isEmpty(): boolean {
    return this.items.length === 0
  }

  toString(): string {
    return this.items.join('\n')
  }
}

interface inputType { stacks: string[]; instructions: string[] }
type UppercaseSingleCharType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'

function isUppercaseSingleChar(value: any): value is UppercaseSingleCharType {
  return typeof value === 'string' && value.length === 1 && value >= 'A' && value <= 'Z'
}

type stacksType = Stack<UppercaseSingleCharType>[]
interface parsedInputType {
  stacks: stacksType
  instructions: {
    amount: number
    stackNum: number
    targetStackNum: number
  }[]
}

const parse = (data: string): parsedInputType => {
  const lines = data.split('\n')
  const splitUpData: inputType = { stacks: [], instructions: [] }
  let type: 'stacks' | 'instructions' = 'stacks'

  for (const line of lines) {
    if (line === '') {
      // after the newline, the content switches from stacks to instructions
      type = 'instructions'
      continue
    }

    splitUpData[type].push(line)
  }
  const parsedStacks = parseStacks(splitUpData.stacks)
  const parsedInstructions = parseInstructions(splitUpData.instructions)

  return { stacks: parsedStacks, instructions: parsedInstructions }
}

const parseInstructions = (instructions: string[]) => instructions.map((line) => {
  const pattern = /move (\d+) from (\d+) to (\d+)/g
  const [,amount, stackNum, targetStackNum] = pattern.exec(line)

  return { amount: parseInt(amount), stackNum: parseInt(stackNum), targetStackNum: parseInt(targetStackNum) }
})

// Due to the way the input data is formatted, this is the way to access an item of a stack
const calcIndexForStackNum = (stackNum: number) => 1 + stackNum * 4

const parseStacks = (stackData: string[]): stacksType => {
  const lastLine = (stackData[stackData.length - 1] ?? '').trim()
  const amountOfStacks = parseInt(lastLine[lastLine.length - 1] ?? '')

  const stacks: stacksType = []

  let currentStack = new Stack<UppercaseSingleCharType>()
  for (let stackIndex = 0; stackIndex < amountOfStacks; stackIndex++) {
    // Iterate in reverse because we're pushing onto a stack
    for (let lineIndex = stackData.length - 1; lineIndex >= 0; lineIndex--) {
      const currentChar = stackData[lineIndex]?.[calcIndexForStackNum(stackIndex)]
      if (currentChar && currentChar !== ' ' && isUppercaseSingleChar(currentChar))
        currentStack.push(currentChar)
    }
    // make copy of the class instance
    stacks.push(Object.assign(Object.create(Object.getPrototypeOf(currentStack)), currentStack))
    currentStack = new Stack<UppercaseSingleCharType>()
  }
  return stacks
}

const part1 = (input: parsedInputType) => {
  for (const instruction of input.instructions) {
    for (let amountMoved = 0; amountMoved < instruction.amount; amountMoved++) {
      const fromStack = input.stacks[instruction.stackNum - 1]
      const currentlyHandledItem = fromStack.pop()
      if (!currentlyHandledItem)
        throw new Error('shouldnt happen')
      input.stacks[instruction.targetStackNum - 1]?.push(currentlyHandledItem)
    }
  }

  return input.stacks.reduce<string[]>((chars, currentStack) => {
    const topItem = currentStack.peek()
    if (!topItem)
      throw new Error('also shouldnt happen')
    return [...chars, topItem]
  }, []).join('')
}

console.log(part1(parse(input)))
