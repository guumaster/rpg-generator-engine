'use strict'

import { isString } from '../utils'
import { sum, rand, range } from '../utils'
import toLetters from './filter_to_number'

export const isDiceRoll = str => str.match(/([0-9]*)?d([0-9]+)(?:([+\-*/])([0-9]+))?/)
export const rollDice = (sides, amount) => sum(range(amount||1).map(() => rand(1, sides)))
export const makeRoller = (str, filters) => {
	const parts = isDiceRoll(str)
  if (!parts) {
    return 0
  }

  const convert = isString(filters) ? filters.match(/num(1)?/) : false
  let [,amount,sides, op, mod] = parts
  mod = Number(mod)
  sides = Number(sides)
  amount = Number(amount)
  return () => {

    const roll = rollDice(sides, amount)
    if (!op || !mod || mod === 0) {
      return convert ? toLetters(roll, convert[1]) : roll
    }
    if (op === '+') return roll + mod
    if (op === '-') return roll - mod
    if (op === '*') return roll * mod
    if (op === '/') return Math.round(roll / mod)
    return convert ? toLetters(roll, convert[1]) : roll
  }
}


