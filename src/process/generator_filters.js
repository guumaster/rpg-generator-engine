'use strict'

import { FILTERS } from './filters'

import { id } from '../utils'

const generatorRE = /([^\[]*)\[(?:([^@\]]+)@)?([^\[\]|]*)(?:\|([^\[\]]*))?\]/gm
const lastpartRE = /((?:.+)\])?(.*)$/

const applyOuter = (str, fn) => {
  let newStr = str, lastIndex, match;
  while (match = generatorRE.exec(str)) {
    newStr = newStr.replace(match[1], fn(match[1]))
    lastIndex = match.index
  }
  return  newStr.replace(lastpartRE, (str, m1, m2) => `${m1 || ''}${fn(m2)}` )
}

export default strFilters => {
  const filters = strFilters ? strFilters.split('|') : null
  if (!strFilters || !filters) {
    return id
  }

  return str => {
    return filters.filter(id).reduce((moddedStr, filter) => {
      let fn  = FILTERS[filter]

      return fn ? applyOuter(moddedStr, fn) : moddedStr
    }, str)
  }
}
