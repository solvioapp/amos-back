const {makeExecutableSchema} = require('graphql-tools')

const resolvers = require('./resolvers')

const schema = `
type Movie {
    movieId: String!
    title: String
    year: Int
    plot: String
    poster: String
    imdbRating: Float
    genres: [String]
    similar: [Movie]
}
type Query {
    movies(subString: String!, limit: Int!): [Movie]
}
schema {
    query: Query
}
`;

let exeSchema = makeExecutableSchema({typeDefs: schema, resolvers});

// console.log(exeSchema);
module.exports = exeSchema;
