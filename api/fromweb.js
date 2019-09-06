import express from 'express'
import { ApolloServer } from 'apollo-server-express'

// ...
import passport from 'passport'
import passportJWT from 'passport-jwt'
import jwt from 'jsonwebtoken'
// ...

import schema from './schemas'

const { GRAPHQL_PORT, JWT_SECRET } = process.env

// ...
const users = [
  {
    id: 1,
    name: 'John',
    email: 'john@mail.com',
    password: 'john123'
  }
]

// generate a jwt token for testing purposes
console.log(jwt.sign(users[0], JWT_SECRET))

// ...

const { Strategy, ExtractJwt } = passportJWT

const params = {
  secretOrKey: JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}

const strategy = new Strategy(params, (payload, done) => {
  const user = users.find(user => user.id === payload.id) || null

  return done(null, user)
})

passport.use(strategy)

// ...

const app = express()

// ...

passport.initialize()

app.use('/graphql', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (user) {
      req.user = user
    }

    next()
  })(req, res, next)
})

// ...

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    user: req.user
  })
})

server.applyMiddleware({
  app
})

app.listen(
  {
    port: GRAPHQL_PORT
  },
  () => console.log(`The GraphQL server is running on port ${GRAPHQL_PORT}`)
)