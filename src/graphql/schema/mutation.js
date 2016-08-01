import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

export default (categoriesMutation) =>
  new GraphQLObjectType({
    name: 'RootMutationType',
    fields: {
      categories: {
        type: categoriesMutation,
        resolve: () => categoriesMutation,
      },
    },
    args: {
      id: {
        name: 'id',
        type: new GraphQLNonNull(GraphQLString),
      },
      name: {
        name: 'name',
        type: new GraphQLNonNull(GraphQLString),
      },
      parentId: {
        name: 'parentId',
        type: GraphQLString,
      },
    },
  });
