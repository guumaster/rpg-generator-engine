'use strict'

import deepAssign from 'deep-assign'

import { parser, processSources } from './process'
import { addRemotes, fetchRemote, mergeRemote } from './remotes'
import { getDefaultKey } from './utils'
import sourcesToTables from './transforms/sources_to_table'

const HOST = 'https://roleando.herokuapp.com'

class Generator {
  constructor ({ host }={}) {
    this.host = host || HOST
    this.contextList = [ null ]
    this.data = { sources: {}, tpls: {}, remotes: {} }
  }

  fromRemote(remoteId) {
    this.reset()
    this.data.remotes[remoteId] = { name: null }
    return fetchRemote({ BASE_URL: `${this.host}/api/generators` })(remoteId)
      .then(res => mergeRemote(this, res) )
      .then(() => delete this.data.remotes[remoteId])
      .then(() => processSources(this))
  }

  addContent(str) {
    this.data = deepAssign({}, this.data, parser(str))
    const promise = this.data.remotes ? addRemotes(this, this.data.remotes) :  Promise.resolve([])
    return promise
      .then(list => list.map(res => mergeRemote(this, res)))
      .then(() => processSources(this))
  }

  reset() {
    this.selectors = {}
    this.data = { sources: {}, tpls: {}, remotes: {} }
  }

  listSources() {
    return Object.keys(this.data.sources)
  }

  listTpls() {
    return Object.keys(this.data.tpls)
  }

  listRemotes() {
    return this.data.remotes
  }

  generate(userKey) {
      const key = userKey || getDefaultKey(this)
      return this.selectors[key] ? this.selectors[key]() : '';
  }

  toJSON() {
    return this.data
  }

  toRollTables(opts) {
    return sourcesToTables(this.data.sources)
  }
}

export default Generator
