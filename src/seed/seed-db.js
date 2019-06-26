import ApolloClient from "apollo-client";
import { ApolloLink } from "apollo-link";
import gql from "graphql-tag";
import dotenv from "dotenv";
import seedmutations from "./seed-mutations";
import seedqueries from "./seed-queries";
import fetch from "node-fetch";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from 'apollo-link-error'


dotenv.config();

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) graphQLErrors.map(({ message }) => console.log(message))
})

const client = new ApolloClient({
  link: ApolloLink.from([errorLink, new HttpLink({
    uri: process.env.GRAPHQL_URI,
    fetch
  })]),
  cache: new InMemoryCache(),
});

// client
//   .query({
//     query: gql(seedqueries)
//   })
//   .then(data => console.log(data.data))
//   .catch(error => console.log(error))

client
  .mutate({
    mutation: gql(seedmutations)
  })
  .then(data => console.log(data))
  .catch(error => console.error(error));
