import {H,R,requireContext} from '../common'

requireContext()
const req = require.context(`.`, true, /\.\/.+\/resolvers\.js$/)

const cache = []
const importAll = req => {
  req.keys().forEach(key => cache.push(req(key)))
}
importAll(req)

const hi = R.mergeDeepRight (cache)
hi |> console.log
export default hi
