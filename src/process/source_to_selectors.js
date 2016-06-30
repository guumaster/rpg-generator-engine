'use strict'

import makeGenerators from './generator'
import createSelectors from './weighted_selector'

export default instance => {
  instance.selectors = makeGenerators(instance.data, createSelectors(instance.data.sources, instance.selectors || {}))
  return instance
}

