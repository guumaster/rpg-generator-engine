'use strict'

import { default as makeGenerators } from './generator'
import { default as createSelectors } from './weighted_selector'

export default instance => {
  instance.selectors = makeGenerators(instance.data, createSelectors(instance.data.sources, instance.selectors || {}))
  return instance
}

