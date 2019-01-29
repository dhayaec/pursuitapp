import { gql } from 'apollo-server-core';
// import * as faker from 'faker';
import { print } from 'graphql/language/printer';
import { Connection } from 'typeorm';
import { connectTestDb } from '../../db';
import { gqlCall } from '../../utils/test-utils';

let conn: Connection;
beforeAll(async () => {
  conn = await connectTestDb();
});
afterAll(async () => {
  if (conn) {
    await conn.close();
  }
});

const registerMutation = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      name
      email
    }
  }
`;

describe('Register', () => {
  it('should register new user', async () => {
    const user = {
      name: 'someone',
      email: 'testing@gmail.com',
      password: '123456',
      mobile: '1232323232'
    };

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
