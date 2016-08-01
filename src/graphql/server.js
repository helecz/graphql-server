import express from 'express';
import graphqlHTTP from 'express-graphql';
import http from 'http';
import serviceLocator from './container';

const app = express();
const server = http.Server(app);

serviceLocator()
  .then((container) => {
    console.log('Preparing express js');

    app.use('/graphql', graphqlHTTP((request) => ({
      schema: container.schema,
      context: {
        clientId: request.headers['x-hele-client-id'],
      },
      pretty: true,
      graphiql: true,
    })));

    console.log('Starting graphql server');

    server.listen(process.env.PORT || 3000, () => {
      const { address, port } = server.address();
      console.log(`graphql server listening at ${address} on port ${port}`);
    });
  });
