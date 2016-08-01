import {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql';

export default () =>
  new GraphQLObjectType({
    name: 'Response',
    description: 'Mutation response',
    fields: {
      name: {
        status: new GraphQLNonNull(GraphQLString),
        description: 'a mutation response name',
      },
    },
  });
