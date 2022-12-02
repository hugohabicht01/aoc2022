import { example, input } from './input'

const beatsLookup = {
  A: 'C',
  B: 'A',
  C: 'B',
} as const

const getsbeatenLookup = {
  A: 'B',
  B: 'C',
  C: 'A',
} as const

const equalityLookup = {
  X: 'A',
  Y: 'B',
  Z: 'C',
  A: 'X',
  B: 'Y',
  C: 'Z',
} as const

const scoringLookup = {
  X: 1,
  Y: 2,
  Z: 3,
} as const

const outcomeLookup = {
  loss: 0,
  draw: 3,
  win: 6,
}

const neededOutcomeLookup = {
  X: 'loss',
  Y: 'draw',
  Z: 'win',
} as const

type opponentPlayType = 'A' | 'B' | 'C'
type myPlayType = 'X' | 'Y' | 'Z'

type instructionsType = [opponentPlayType, myPlayType][]

const parse = (data: string): instructionsType => data.split('\n').map((l) => {
  const [opponentPlay, myPlay] = l.split(' ')
  return [opponentPlay as opponentPlayType, myPlay as myPlayType]
})

const part1 = (instructions: instructionsType) => instructions.reduce<number>((acc, curr) => {
  const [opponentPlay, myPlay] = curr

  if (equalityLookup[myPlay] === opponentPlay)
    return acc + outcomeLookup.draw + scoringLookup[myPlay]

  if (beatsLookup[opponentPlay] === equalityLookup[myPlay])
    return acc + outcomeLookup.loss + scoringLookup[myPlay]
  return acc + outcomeLookup.win + scoringLookup[myPlay]
}, 0)

const part2 = (instructions: instructionsType) => instructions.reduce<number>((acc, curr) => {
  const [opponentPlay, neededOutcome] = curr

  let myPlay: myPlayType
  if (neededOutcomeLookup[neededOutcome] === 'loss')
    myPlay = equalityLookup[beatsLookup[opponentPlay]]
  else if (neededOutcomeLookup[neededOutcome] === 'draw')
    myPlay = equalityLookup[opponentPlay]
  else
    myPlay = equalityLookup[getsbeatenLookup[opponentPlay]]

  return acc + scoringLookup[myPlay] + outcomeLookup[neededOutcomeLookup[neededOutcome]]
}, 0)

console.log(part2(parse(input)))
