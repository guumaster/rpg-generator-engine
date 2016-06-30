'use strict'

import { execReplacement } from './generator'

export default (tables, selectors) => {
  return Object.keys(tables).reduce((obj, key) => {
    obj[key] = createWeightedSelector(tables[key], selectors)
    return obj
  }, selectors)
}

const createWeightedSelector = (table, selectors) => {
  const inSet = table.map(row => row[1])
  const inWeights =  table.map(row => row[0])
  if (!Array.isArray(inSet) || !Array.isArray(inWeights)) {
    throw new TypeError('Set and Weights must be arrays.')
  }
  const weights = (!inWeights) ? inSet.map(() => 1) : inWeights.map(x => Number(x))
  if (inSet.length !== inWeights.length) {
    throw new TypeError('Set and Weights are different sizes.')
  }

  const sum = weights.reduce((sum, weight) => sum + weight, 0)
  const weighted = weights.map(raw => raw / sum)

  return () => {
    let key = Math.random()
    let index = 0

    for (;index < weighted.length; index++) {
      key -= weighted[index]

      if (key < 0) {
        return execReplacement(inSet[index], selectors)
      }
    }
  }
}

