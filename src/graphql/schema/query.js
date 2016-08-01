import {
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';

export default () =>
  new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      hello: {
        type: GraphQLString,
        resolve: () => 'world',
      },
      categories: {
        type: GraphQLString,
        resolve: () => [],
      },
    },
  });
