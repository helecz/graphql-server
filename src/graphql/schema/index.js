import { GraphQLSchema } from 'graphql';

export default (query, mutation) =>
  new GraphQLSchema({
    query,
    mutation,
  });
