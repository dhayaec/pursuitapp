import { createConnection } from 'typeorm';
import { ConnectionList } from './types/types';

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASS,
  DB_NAME_DEV,
  DB_NAME_PROD,
  DB_NAME_TEST,
  DB_TYPE,
  ROOT_USER,
  ROOT_PASS,
  NODE_ENV,
} = process.env;

const connectionList: ConnectionList = {
  development: {
    name: 'development',
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME_DEV,
    synchronize: true,
    logging: false,
    entities: ['src/entity/**/*.*'],
    migrations: ['src/migration/**/*.*'],
    subscribers: ['src/subscriber/**/*.*'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  },
  test: {
    name: 'test',
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME_TEST,
    dropSchema: true,
    synchronize: true,
    logging: false,
    entities: ['src/entity/**/*.ts'],
    migrations: ['src/migration/**/*.ts'],
    subscribers: ['src/subscriber/**/*.ts'],
    cli: {
      entitiesDir: 'src/entity',
      migrationsDir: 'src/migration',
      subscribersDir: 'src/subscriber',
    },
  },
  production: {
    name: 'production',
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME_PROD,
    synchronize: false,
    logging: false,
    entities: ['dist/entity/**/*.*'],
    migrations: ['dist/migration/**/*.*'],
    subscribers: ['dist/subscriber/**/*.*'],
  },
  root: {
    name: 'root',
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    username: ROOT_USER,
    password: ROOT_PASS,
  },
};

export async function createDb() {
  const connectionOptions = connectionList.root;
  const rootConnection = await createConnection({
    ...connectionOptions,
    name: 'default',
  });

  let dbName: string;
  if (NODE_ENV === 'test') {
    dbName = DB_NAME_TEST as string;
  } else if (NODE_ENV === 'development') {
    dbName = DB_NAME_DEV as string;
  } else {
    dbName = DB_NAME_PROD as string;
  }

  const grantQ =
    // tslint:disable-next-line:prefer-template
    'GRANT ALL ON ' + dbName + '.* TO `' + process.env.DB_USER + '`@`%`;';

  await rootConnection
    .query(`CREATE DATABASE IF NOT EXISTS ${dbName};`)
    .then(async () => {
      await rootConnection.query(grantQ);
      await rootConnection.close();
    });
}

export async function dbConnection() {
  let retries = 5;
  while (retries) {
    try {
      const options = connectionList[NODE_ENV as string] as any;
      return createConnection({
        ...options,
        name: 'default',
      });
    } catch (err) {
      console.log(err);
      retries -= 1;
      console.log(`retries left: ${retries}`);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
  return null;
}
