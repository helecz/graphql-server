import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
} from 'graphql';

export default (mutationResponse, commandFactory) =>
  new GraphQLObjectType({
    name: 'RootMutationCategoriesType',
    fields: {

      createCategory: {
        type: GraphQLString,
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
        resolve: (parentValue, args, { clientId }) => {
          console.log(clientId);
          return commandFactory('createCategory', args, clientId);
        },
      },

      deleteCategory: {
        type: GraphQLString,
        args: {
          id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString),
          },
        },
        resolve: (rootValue, args) => commandFactory('deleteCategory', args),
      },

    },
  });
