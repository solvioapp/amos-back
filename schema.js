const {makeExecutableSchema} = require('graphql-tools')

const resolvers = require('./resolvers')

const schema = `
type User {
    id: Int!
    username: String!
    email: String!
}

type Query {
    me: User
}

type Mutation {
    signup (username: String!, email: String!, password: String!): String
    login (email: String!, password: String!): String
}
`;

let exeSchema = makeExecutableSchema({typeDefs: schema, resolvers});

// console.log(exeSchema);
module.exports = exeSchema;
