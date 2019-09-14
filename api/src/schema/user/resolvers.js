import {H,R,requireContext} from '../../common'

requireContext()
/* Matches all .js files in /mutations and /queries (including recusive dirs) */
const queries = require.context(`.`, true, /\.\/queries\/(\.|\w)+\.js$/)
const mutations = require.context(`.`, true, /\.\/mutations\/(\.|\w)+\.js$/)

const queriesCache = []
const mutationsCache = []

const importAll = cache => req => {
  req.keys().forEach(key => cache.push(req(key)))
}

importAll (queriesCache) (queries)
importAll (mutationsCache) (mutations)

const queriesDefaultsRemoved = R.map (v => R.propOr (v) (`default`) (v)) (queriesCache)
const mutationsDefaultsRemoved = R.map (v => R.propOr (v) (`default`) (v)) (mutationsCache)

export default {
  Query: H.arrayOfFnsToObject (queriesDefaultsRemoved),
  Mutation: H.arrayOfFnsToObject (mutationsDefaultsRemoved),
}
