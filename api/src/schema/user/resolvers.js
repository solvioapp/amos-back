import {H,R} from '../../common'
import {neo4jgraphql} from 'neo4j-graphql-js'
import bcrypt from 'bcrypt'

import {createToken} from '../../auth/auth'

export default {
  Query: {
    Login: async (_, {email, password}, {driver}) => {
      /* Setup */
      const ses = driver.session()
      const _1 = 
      `MATCH (u:User {email: $email})
      -[:AUTHENTICATED_WITH]->
      (l:LOCAL_ACCOUNT {email: $email}) 
      RETURN l.hashedPassword as hashedPassword`

      /* Get user's hashed password */
      const {records: recs} = await ses.run (_1, {email})

      /* Check if user exists */
      H.assert (H.isNotEmpty (recs)) (`no user with that email`)

      /* Check if password is correct */
      H.assert (bcrypt.compare(password, recs[0].get (`hashedPassword`))) (`incorrect password`)

      /* Grant jwt */
      return await createToken({user: {email}}, process.env.JWT_SECRET)
    },
    currentUser: async (_, __, {driver, user}) => {
      /* Setup */
      const ses = driver.session()

      /* Check request is authenticated */
      H.assert (H.isNotNil (user?.id)) (`authentication required`)

      const _1 =
      `MATCH (u:User {id: $id})
      WITH {email: u.email} as u
      RETURN u`

      const {records: recs} = await ses.run (_1, {id: user?.id})

      recs |> console.log('recs', #)
      
      return recs[0].get(`u`)
    },
  },
  Mutation: {
    Signup: async (_, {email, password}, {driver}) => {
      /* Setup */
      const ses = driver.session()
      const _1 = 
      `MATCH (u:User) WHERE u.email = $email RETURN u`

      /* Check if user exists */
      const {records: recs} = await ses.run (_1, {email})      
      H.assert (R.isEmpty (recs)) (`a user with email ${email} already exists.`)

      /* Hash password */
      const hashedPassword = await bcrypt.hash(password, 12)
      const _2 = 
      `CREATE (u:User {email: $email})
      -[:AUTHENTICATED_WITH]->
      (l:LOCAL_ACCOUNT {hashedPassword: $hashedPassword, email: $email})
      RETURN u`

      /* Save user to db! */
      await ses.run (_2, {email, hashedPassword})

      /* Grant jwt */
      return await createToken({user: {email}}, process.env.JWT_SECRET)
    },
    UpdatePassword: async (_, {email, password, _new}, {driver, user}) => {
      /* Setup */
      const ses = driver.session()

      /* Check request is authenticated */
      H.assert (H.isNotNil (user?.id)) (`authentication required`)

      /* Check current password is correct */
      const _1 = 
      `MATCH (la:LOCAL_ACCOUNT)
      WHERE la.email = $email
      RETURN la`
      const {records: recs} = await ses.run(_1, {email})
      H.assert (H.isNotEmpty (recs)) (`no user with that email`)
      H.assert (bcrypt.compare(password, recs[0].get (`hashedPassowrd`))) (`incorrect password`)

      /* Save new password */
      const hashedNew = await bcrypt.hash (_new, 12)
      const _2 =
      `MATCH (la:LOCAL_ACCOUNT {email: $email})
      SET la+= {hashedPassword: hashedNew}
      RETURN la`
      await ses.run (_2, {email, hashedNew})
    },
  },
}
