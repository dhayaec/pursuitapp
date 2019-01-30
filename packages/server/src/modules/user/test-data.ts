import { gql } from 'apollo-server-core';

export const user = {
  name: 'someone',
  email: 'testing@gmail.com',
  password: '123456',
  mobile: '1232323232'
};

export const registerMutation = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      name
      email
    }
  }
`;

export const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      email
    }
  }
`;

export const logoutMutation = gql`
  mutation {
    logout
  }
`;

export const meQuery = gql`
  {
    me {
      name
      email
    }
  }
`;

export const getUserQuery = gql`
  query GetUser($id: String!) {
    getUser(id: $id) {
      name
      email
    }
  }
`;

export const resendVerifySignup = gql`
  mutation {
    resendVerifySignup
  }
`;

export const forgotPasswordMutation = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email)
  }
`;

export const changePasswordMutation = gql`
  mutation ChangePassword($oldPassword: String!, $password: String!) {
    changePassword(oldPassword: $oldPassword, password: $password) {
      name
      email
    }
  }
`;

export const verifyForgotPasswordMutation = gql`
  mutation VerifyForgotPassword(
    $token: String!
    $password: String!
    $confirmPassword: String!
  ) {
    verifyForgotPassword(
      token: $token
      password: $password
      confirmPassword: $confirmPassword
    ) {
      id
    }
  }
`;

export const changeEmailMutation = gql`
  mutation ChangeEmail($email: String!) {
    changeEmail(email: $email) {
      name
      email
    }
  }
`;
