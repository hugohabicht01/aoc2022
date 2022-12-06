import { example, input } from './input'

class FixedLengthQueue<T> {
  private items: T[]
  private maxLength: number

  constructor(maxLength: number) {
    this.items = []
    this.maxLength = maxLength
  }

  public enqueue(item: T) {
    if (this.items.length >= this.maxLength)
      this.items.shift()

    this.items.push(item)
  }

  public dequeue() {
    return this.items.shift()
  }

  public peek() {
    return this.items[0]
  }

  public get length() {
    return this.items.length
  }

  public itemsAllUnique() {
    return (new Set(this.items)).size === this.items.length && this.items.length === this.maxLength
  }
}

function isLowercaseSingleCharType(value: any): value is LowercaseSingleCharType {
  return /^[a-z]$/.test(value)
}

type LowercaseSingleCharType = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z'

const parse = (databuffer: string): LowercaseSingleCharType[] => databuffer.split('').filter(isLowercaseSingleCharType)

const part1 = (chars: LowercaseSingleCharType[]) => {
  const q = new FixedLengthQueue<LowercaseSingleCharType>(4)
  let count = 0
  for (const c of chars) {
    count++
    q.enqueue(c)
    if (q.itemsAllUnique())
      return count
  }
}

const part2 = (chars: LowercaseSingleCharType[]) => {
  const q = new FixedLengthQueue<LowercaseSingleCharType>(14)
  let count = 0
  for (const c of chars) {
    count++
    q.enqueue(c)
    if (q.itemsAllUnique())
      return count
  }
}
console.log(part2(parse(input)))
