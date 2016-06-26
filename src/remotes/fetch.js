'use strict'

import fetch from 'isomorphic-fetch'

export default config => id => fetch(`${config.BASE_URL}/table/${id}`, {
  method: 'GET',
  credentials: 'same-origin',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
}).then(res => {
  if (res.status >= 400) return res.json().then(err => Promise.reject(err))
  return res.json()
})
