'use strict'

import deepAssign from 'deep-assign'

import parser from '../process/parser'
import addRemotes from './add'

export default (instance, res) => {
  const str = `${res.data.tpls}\n${res.data.tables}`
  const context = instance.data.remotes[res.tableId].name

  const newData = parser(str, context)
  instance.data = deepAssign({}, instance.data, newData)

  if (context) {
    instance.contextList.push(context)
  }

  if( newData.remotes) {
    return addRemotes(instance, newData.remotes)
  }
}
