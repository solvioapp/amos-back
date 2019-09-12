import express from 'express'
import {ApolloServer} from 'apollo-server-express'
import CONFIG, {requiredConfigs} from './config'
import middleware from './middleware'
import {getDriver} from './bootstrap/neo4j'
// import decode from './jwt/decode'
import schema from './schema'
import {R} from './common'
import helmet from 'helmet'

// check required configs and throw error
// TODO check this directly in config file - currently not possible due to testsetup
R.mapObjIndexed ((val, key) => val ? null : throw new Error(`ERROR: "${key}" env variable is missing.`))  (requiredConfigs)

const driver = getDriver()

const context = async ({req}) => {
  // const user = await decode(driver, req.headers.authorization)
  return {
    driver,
    // user,
    req,
    cypherParams: {
      // currentUserId: user?.id,
    },
  }
}

const defaults = {
  context,
  schema,
  debug: !!CONFIG.DEBUG,
  tracing: !!CONFIG.DEBUG,
}

const createServer = options => {
  const server = new ApolloServer (R.mergeAll ([defaults, options]))

  const app = express()
  app.use (helmet())
  app.use (express.static (`public`))
  server.applyMiddleware ({ app, path: `/` })

  return {server, app}
}

export default createServer
