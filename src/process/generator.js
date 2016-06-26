'use strict'

import getModdedGenerator from './generator_mods'
import getFilteredGenerator from './generator_filters'
import { isDiceRoll, makeRoller } from './roller'

const contextRE = /(?:([^\.]+)\.)?(.*)/
const generatorRE = /\[(?:([^@\]]+)@)?([^\[\]|]*)(?:\|([^\[\]]*))?\]/gm
const inlineTableRE = /\[(?:([^@\]]+)@)?>(([^;\@\[\]\|]+;*)+)\]/g

const hasMoreSelectors = str => str.match(generatorRE)

const makeInlineGenerator = str => {

  const [,, inline] = inlineTableRE.exec(str)
  const options = inline.split(/;/)

  return () => {
    return options[Math.floor(Math.random() * options.length)]
  }
}

const execReplacement = (str, selectors, fromContext, recursive) => {
  const lines = str.split(/\n/)

  return lines.reduce((final, line) => {
    let match
    if (!hasMoreSelectors(line)) {
      return `${final}\n${line}`
    }

    while (match = generatorRE.exec(line)) {
      let [pattern, mod, fullName, filters] = match
      let [,context,name] = (fullName || '').match(contextRE)
      context = context || fromContext || 'main'
      let inlineGenerator

      if (pattern.match(inlineTableRE)) {
        inlineGenerator = makeInlineGenerator(pattern)
      }

      // only add known generators to the queue
      let dice
      if (dice = isDiceRoll(name)) {
        let roller = makeRoller(name)
        line = line.replace(pattern, roller())
      }

      let generator = inlineGenerator || selectors[`${context}.${name}`] || selectors[name]


      if (generator) {
        let moddedFn = getModdedGenerator(mod, generator)
        let parsed = moddedFn()

        if (hasMoreSelectors(parsed)) {
          parsed = execReplacement(parsed, selectors, context, true)
        }
        let filtered = getFilteredGenerator(filters)
        line = line.replace(pattern, filtered(parsed))
      }
    }
    return `${final}${(recursive)?'':'\n'}${line}`

  }, '')
}

export default (data, selectors) => {
  return Object.keys(data.tpls).reduce((obj, tpl) => {
    obj[tpl] = () => {
      let [,context] = (tpl || '').match(contextRE)
      context = context || 'main'
      return execReplacement(data.tpls[tpl], selectors, context)
    }
    return obj
  }, selectors)
}
