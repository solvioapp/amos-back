import {H,R,requireContext} from '../common'
import {mergeTypes} from 'merge-graphql-schemas'

requireContext()
const req = require.context(`.`, true, /\.gql$/)
const all = R.map (H.read (__dirname)) (req.keys())

export default mergeTypes (all)
