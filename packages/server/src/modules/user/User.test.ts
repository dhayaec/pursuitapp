import { print } from 'graphql/language/printer';
import { Connection } from 'typeorm';
import { connectTestDb } from '../../db';
import { gqlCall } from '../../utils/test-utils';
import {
  loginMutation,
  logoutMutation,
  meQuery,
  registerMutation,
  user
} from './test-data';

let conn: Connection;
beforeAll(async () => {
  conn = await connectTestDb();
});

afterAll(async () => {
  await conn.close();
});

describe('Register', () => {
  it('should register new user', async () => {
    const response = await gqlCall({
      source: print(registerMutation),
      variableValues: {
        data: user
      }
    });

    expect(response).toMatchObject({
      data: {
        register: {
          name: user.name,
          email: user.email
        }
      }
    });
  });
});

describe('Login', () => {
  it('should login', async () => {
    const response = await gqlCall({
      source: print(loginMutation),
      variableValues: {
        email: user.email,
        password: user.password
      }
    });

    expect(response).toMatchObject({
      data: {
        login: {
          email: user.email
        }
      }
    });

    const user2 = { email: user.email, password: 'something' };

    const response2 = await gqlCall({
      source: print(loginMutation),
      variableValues: {
        email: user2.email,
        password: user2.password
      }
    });

    expect(response2).toMatchObject({
      data: {
        login: null
      }
    });

    const user3 = { password: user.password, email: 'something@some.com' };

    const response3 = await gqlCall({
      source: print(loginMutation),
      variableValues: {
        email: user3.email,
        password: user3.password
      }
    });

    expect(response3).toMatchObject({
      data: {
        login: null
      }
    });
  });
});

describe('Logout', () => {
  it('should logout user', async () => {
    const res = await gqlCall({
      source: print(logoutMutation)
    });
    expect(res).toEqual({ data: { logout: false } });
  });
  it('should return logged in user', async () => {
    const result = await gqlCall({
      source: print(meQuery)
    });
    expect(result).toEqual({
      data: {
        me: null
      }
    });
  });
});
