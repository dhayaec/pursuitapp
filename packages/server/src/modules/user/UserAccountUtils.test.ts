import { print } from 'graphql/language/printer';
import { Connection } from 'typeorm';
import { connectTestDb } from '../../db';
import { redis } from '../../redis';
import { TokenTypes } from '../../utils/constants';
import { gqlCall } from '../../utils/test-utils';
import { User } from './../../entity/User';
import { createTokenLink } from './../../utils/utils';
import {
  changeEmailMutation,
  changePasswordMutation,
  forgotPasswordMutation,
  getUserQuery,
  meQuery,
  resendVerifySignup as resendVerifySignupMutation,
  verifyForgotPasswordMutation
} from './test-data';

let userId: string;
let name: string;
let email: string;
let conn: Connection;
beforeAll(async () => {
  conn = await connectTestDb(true);
  const user = await User.create({
    name: 'test user',
    email: 'testing@testing.co',
    password: '123456'
  }).save();
  userId = user.id;
  name = user.name;
  email = user.email;
});

afterAll(() => {
  conn.close();
});

describe('UserAccountUtils', () => {
  describe('resendVerifySignup', () => {
    it('should send verify signup', async () => {
      const response = await gqlCall({
        source: print(resendVerifySignupMutation),
        userId
      });

      expect(response).toMatchObject({
        data: {
          resendVerifySignup: true
        }
      });

      const response2 = await gqlCall({
        source: print(resendVerifySignupMutation),
        userId: ''
      });

      expect(response2).toMatchObject({
        data: {
          resendVerifySignup: false
        }
      });
    });
  });

  describe('me', () => {
    it('should return me', async () => {
      const response = await gqlCall({
        source: print(meQuery),
        userId
      });
      expect(response).toMatchObject({
        data: {
          me: {
            name,
            email
          }
        }
      });
    });
  });

  describe('getUser', () => {
    it('should return getUser', async () => {
      const response = await gqlCall({
        source: print(getUserQuery),
        variableValues: {
          id: userId
        }
      });
      expect(response).toMatchObject({
        data: {
          getUser: {
            name,
            email
          }
        }
      });
    });
  });

  describe('forgotPassword', () => {
    it('should send forgot password email', async () => {
      const response = await gqlCall({
        source: print(forgotPasswordMutation),
        variableValues: {
          email
        },
        userId
      });

      expect(response).toMatchObject({
        data: {
          forgotPassword: true
        }
      });

      const response2 = await gqlCall({
        source: print(forgotPasswordMutation),
        variableValues: {
          email: ''
        },
        userId: ''
      });

      expect(response2).toMatchObject({
        data: {
          forgotPassword: false
        }
      });
    });
  });

  describe('changePassword', () => {
    it('should send forgot password email', async () => {
      const response = await gqlCall({
        source: print(changePasswordMutation),
        variableValues: {
          oldPassword: '123456',
          password: '1234567'
        },
        userId
      });

      expect(response).toMatchObject({
        data: {
          changePassword: {
            name,
            email
          }
        }
      });

      const failCase = await gqlCall({
        source: print(changePasswordMutation),
        variableValues: {
          oldPassword: 'something',
          password: '1234567'
        },
        userId
      });

      expect(failCase).toMatchObject({
        data: null
      });
    });
  });

  describe('changeEmail', () => {
    it('should send forgot password email', async () => {
      const response = await gqlCall({
        source: print(changeEmailMutation),
        variableValues: {
          email: 'email@email.com'
        },
        userId
      });

      expect(response).toMatchObject({
        data: {
          changeEmail: {
            name,
            email: 'email@email.com'
          }
        }
      });

      const fail = await gqlCall({
        source: print(changeEmailMutation),
        variableValues: {
          email: 'email@email.com'
        },
        userId
      });

      expect(fail).toMatchObject({
        data: null
      });
    });
  });

  describe('verifyForgotPassword', () => {
    it('should send forgot password email', async () => {
      const t = await createTokenLink('/', userId, redis, TokenTypes.reset);
      const token = t.split('/').splice(-1)[0];
      const response = await gqlCall({
        source: print(verifyForgotPasswordMutation),
        variableValues: {
          token,
          password: 'newPassword',
          confirmPassword: 'newPassword'
        },
        userId
      });

      expect(response).toMatchObject({
        data: {
          verifyForgotPassword: {
            id: userId
          }
        }
      });
    });
  });
});
