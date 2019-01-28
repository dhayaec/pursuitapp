// tslint:disable-next-line:no-import-side-effect
import 'reflect-metadata';
// tslint:disable-next-line:no-var-requires
require('dotenv-safe').config();
import { ApolloServer } from 'apollo-server-express';
import * as connectRedis from 'connect-redis';
import * as cors from 'cors';
import * as express from 'express';
import * as session from 'express-session';
import { formatArgumentValidationError } from 'type-graphql';
import { connectDb, createDb } from './db';
import { redis } from './redis';
import { createSchema } from './utils/create-schema';

const startServer = async () => {
  try {
    await createDb();
  } catch (error) {
    throw new Error(error);
  }

  await connectDb();

  const app = express();

  const server = new ApolloServer({
    schema: await createSchema(),
    formatError: formatArgumentValidationError,
    context: ({ req, res }: any) => ({ req, res })
  });

  const RedisStore = connectRedis(session);

  app.use(
    cors({
      credentials: true,
      origin: 'http://localhost:3000'
    })
  );

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
      }),
      name: 'qid',
      secret: 'superSecret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7 * 365 // 7 years
      }
    })
  );

  server.applyMiddleware({ app }); // app is from an existing express app

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
