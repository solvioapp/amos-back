import {R} from '../../common'
import {neo4jgraphql} from 'neo4j-graphql-js'
import bcrypt from 'bcrypt'

import {createToken} from '../../auth/auth'

const resolvers = {
  Mutation: {
    CreateUser: async (_, {email, password}, {driver}) => {
      /* Check if user exists */
      const ses = driver.session()
      const _1 = 
      `MATCH (u:User) WHERE u.email = $email RETURN u`
      const res = await ses.run (_1, {email})
      R.length (res.records) > 0
        ? throw new Error(`ERROR: a user with email "${email}" already exists.`)
        : null

      /* Save user */
      const hashedPassword = await bcrypt.hash(password, 12)
      const _2 = 
      `CREATE (u:User {email: $email})
      -[:AUTHENTICATED_WITH]->
      (l:LOCAL_ACCOUNT {hashedPassword: $hashedPassword, email: $email})
      RETURN u`
      await ses.run (_2, {email, hashedPassword})
      return await createToken({user: {email}}, process.env.JWT_SECRET)
    },
    Login: async (_, {email, password}, {driver}, resolveInfo) => {
      const q = 
      `MATCH (u:User {email: $email})
      -[:AUTHENTICATED_WITH]->
      (l:LOCAL_ACCOUNT {email: $email}) 
      RETURN l.hashedPassword as hashedPassword`

      const ses = driver.session()
      const res = await ses.run (q, {email})
      const rec = res.records[0]
      const obj = Object.getOwnPropertyNames(rec)
      obj |> console.log('obj', #)
      const r = R.keys (rec)
      r |> console.log('r', #)
      const keys = Object.keys(rec)
      keys |> console.log('keys', #)
      rec.keys |> console.log('rec.keys', #)
      rec.length |> console.log('rec.length', #)
      rec._fields |> console.log('rec._fields', #)
      rec._fieldLookup |> console.log('rec._fieldLookup', #)
      // rec.get(`hashPassword`) |> console.log('rec.get(`hashPassword`)', #)
      const p = rec.__proto__
      p |> console.log('p', #)

      const obj2 = Object.getOwnPropertyNames(p)
      
      obj2 |> console.log('obj2', #)

      rec.toObject() |> console.log('rec.toObject()', #)

      rec.forEach(console.log) |> console.log('rec.forEach(console.log)', #)

      rec.has(`hashPassword`) |> console.log('rec.has(`hashPassword`)', #)
      
      const prototype = rec.prototype
      prototype |> console.log('prototype', #)
      // const user = await neo4jgraphql(object, {email, password}, context, resolveInfo);
      if (!user) {
        throw new Error("No user with that email");
        return null;
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error("Incorrect password");
        return null;
      }

      const signedToken = await createToken({
          user: {
            id: user.id,
            username: user.username,
            email
          }
        },
        context.SECRET
      );

      return `${signedToken}`;
    },
    UpdateUser: async (object, params, context, resolveInfo) => {
      if (isNil(context.user && context.user.id)) {
        throw new Error('Authentication required!')
        return null;
      }
      const updatedUSer = await neo4jgraphql(object, params, context, resolveInfo, true);
      return updatedUSer
    },
    UpdatePassword: async (object, params, context, resolveInfo) => {
      if (isNil(context.user && context.user.id)) {
        throw new Error('Authentication required!')
        return null;
      }
      const {
        password,
        currentPassword,
        email
      } = params;


      // Get password for current Email
      const session = context.driver.session()
      let query = 'Match (la:LOCAL_ACCOUNT) WHERE la.email = $email RETURN la;'
      const userLA = await session.run(query, params).then(result => {
        return result.records.map(record => {
          return record.get('la').properties
        })
      })

      if (userLA.length > 0) {
        // Compare it
        const valid = await bcrypt.compare(currentPassword, userLA[0].password);
        console.log(valid, userLA[0].password, currentPassword)
        // if currentPassword entered & fetched one is same
        // Update Password
        if (valid) {
          params.password = await bcrypt.hash(password, 12);
          const updatedUser = await neo4jgraphql(object, params, context, resolveInfo, true);
          return 'Password Updated successfully!'
        }
        // Else throw error :D
        else {
          throw new Error('Password update failed!')
        }
      } else {
        throw new Error('Password update failed! No user found!')
      }
      

    },
  },
  Query: {
    currentUser: async (object, params, context, resolveInfo) => {

      //   Here check if user authenticated
      if (isNil(context.user && context.user.id)) {
        throw new Error('Authentication required!')
        return null;
      }
      const userID = context.user.id;

      const {
        id,
        email,
        username
      } = await neo4jgraphql(
        object, {
          user: userID
        },
        context,
        resolveInfo
      );

      return {
        id,
        email,
        username
      };
    },
    user: async (object, params, context, resolveInfo) => {

      //   Here check if user authenticated
      if (isNil(context.user && context.user.id)) {
        throw new Error('Authentication required!')
        return null;
      }
      return neo4jgraphql(object, params, context, resolveInfo, true);
    },
  }
}

export default resolvers