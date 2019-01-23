// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import { ApolloServer } from 'apollo-server-express';
import * as express from 'express';
import { buildSchema } from 'type-graphql';

import { createDb, dbConnection } from './db';
import { UserResolver } from './modules/user/UserResolver';

const startServer = async () => {
  try {
    await createDb();
  } catch (error) {
    throw new Error(error);
  }

  await dbConnection();

  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver],
    }),
  });

  server.applyMiddleware({ app }); // app is from an existing express app

  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    ),
  );
};

startServer();
