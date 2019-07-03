import {
  neo4jgraphql
} from "neo4j-graphql-js";
import bcrypt from "bcrypt";
import {
  isNil
} from "lodash";

import {
  createToken
} from "./auth/auth";

export const resolvers = {
  Mutation: {
    RegisterUser: async (object, params, context, resolveInfo) => {
      const user = params;

      // Check if user exist already with email
      const session = context.driver.session()
      let query = 'Match (user:User) WHERE user.email = $email RETURN user;'
      const userExist = await session.run(query, params).then(result => {
        return result.records.map(record => {
          return record.get('user').properties
        })
      })

      if (userExist.length > 0) {
        throw new Error('User already exist')
      } else {
        user.password = await bcrypt.hash(user.password, 12);
        const newUser = await neo4jgraphql(object, user, context, resolveInfo, true)
        const signedToken = await createToken({
            user: {
              id: newUser.id,
              username: newUser.username,
              email: newUser.email
            }
          },
          context.SECRET
        );

        return `${signedToken}`;
      }

    },
    Login: async (object, {
      email,
      password
    }, context, resolveInfo) => {
      const user = await neo4jgraphql(
        object, {
          email,
          password
        },
        context,
        resolveInfo
      );
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
            email: user.email
          }
        },
        context.SECRET
      );

      return `${signedToken}`;
    }
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
};