'use strict'

import fetchRemote from './fetch'

const MAP_REMOTES = new WeakMap()
const loadRemote = instance => fetchRemote({ BASE_URL: `${instance.host}/api/generators` })

const addRemotes = (instance, remoteList) => {

  const CACHE = MAP_REMOTES.get(instance) || {}

  return Promise.all(Object.keys(remoteList).map(remoteId => {

    const promise = CACHE[remoteId] ?  Promise.resolve(CACHE[remoteId]) : loadRemote(instance)(remoteId)

    return promise
      .then(res => {
        CACHE[remoteId] = res
        MAP_REMOTES.set(instance, CACHE)
        return res
      })
  }))
}

export default addRemotes
