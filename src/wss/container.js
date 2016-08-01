import rabbitMq from '../common/rabbitMq';
import uuid from 'node-uuid';

const container = {};
const wssServerId = uuid.v4();

export default () =>
  Promise.all([
    rabbitMq('amqp://admin:%2187%257rAhrcqz@10.10.120.82:5672', `graphql-result-${wssServerId}`),
  ]).then((values) => {
    container.rabbitMq = values[0];

    return container;
  });
