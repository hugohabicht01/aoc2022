/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { example, input } from './input'

const tokenizeData = (input: string) => input.split('\n').map(num => num === '' ? 'newline' : parseInt(num.trim()))

class TopThreeDS {
  public nums: number[]
  constructor() {
    this.nums = [0, 0, 0]
  }

  addNum(num: number) {
    for (const [index, existing] of this.nums.entries()) {
      if (num > existing) {
        this.nums.splice(index, 0, num)
        this.nums.pop()
        return
      }
    }
  }
}

const part1 = (data: (number | 'newline')[]) => {
  let highestAmountOfCalories = 0
  let currentAmount = 0

  data.forEach((calories) => {
    if (calories === 'newline') {
      if (currentAmount > highestAmountOfCalories) {
        highestAmountOfCalories = currentAmount
        currentAmount = 0
        return
      }
      return
    }

    currentAmount += calories
  })

  return highestAmountOfCalories
}

const part2 = (data: (number | 'newline')[]) => {
  let currentAmount = 0
  const topNums = new TopThreeDS()

  data.forEach((calories, i) => {
    if (calories === 'newline') {
      topNums.addNum(currentAmount)
      currentAmount = 0
      return
    }
    if (i === (data.length - 1)) {
      currentAmount += calories
      topNums.addNum(currentAmount)
      return
    }

    currentAmount += calories
  })

  return { nums: topNums.nums, sum: topNums.nums.reduce((acc, cur) => acc + cur) }
}
const result = part2(tokenizeData(input))
console.log(result)
