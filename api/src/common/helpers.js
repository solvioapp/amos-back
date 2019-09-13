import * as R from 'ramda'
import fs from 'fs'
import path from 'path'
// import requireContext from 'require-context.macro'

export const neq = R.complement (R.equals)

export const read = dir => file => fs.readFileSync(path.join(dir, file), {encoding: `utf-8`})

export const mergeDeepAll = R.reduce (R.mergeDeepRight) ({})

/**
 * @description 
 * @example 
 */
export const assert = pr => st => {
  pr
    ? null
    : throw new Error(`ERROR: ${st}.`)
}

export const isNotEmpty = R.complement(R.isEmpty)

export const isNotNil = R.complement(R.isNil)



// requireContext()
// export const importRegex = (dir = `.`, useSubdirs = true, regex = /^\.\/.*$/, mode = `sync`) => {
//   const req = require.context(dir, useSubdirs, regex, mode)
//   const cache = {}
//   const importAll = req => {
//     req.keys().forEach(key => cache[key] = req(key))
//   }
//   importAll(req)
//   return cache
// }