import query from './schema/query';
import mutation from './schema/mutation';
import mutationResponseType from './schema/mutationResponseType';
import schema from './schema';
import categoriesMutation from './schema/category/categoriesMutation';
import commandFactory from './schema/commandFactory';
import rabbitMq from '../common/rabbitMq';

const container = {};

export default () =>
  Promise.all([
    rabbitMq('amqp://admin:%2187%257rAhrcqz@10.10.120.82:5672', 'graphql'),
  ]).then((values) => {
    container.rabbitMq = values[0];
    container.commandFactory = commandFactory(container.rabbitMq);

    container.types = {};
    container.types.mutationResponse = mutationResponseType();

    container.types.category = {};

    container.types.category.mutation = categoriesMutation(container.types.mutationResponse, container.commandFactory);

    container.types.query = query();
    container.types.mutation = mutation(container.types.category.mutation);

    container.schema = schema(container.types.query, container.types.mutation);

    return container;
  });
