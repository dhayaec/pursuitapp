import { gql } from 'apollo-boost';

export const registerMutation = gql`
  mutation Register($data: RegisterInput!) {
    register(data: $data) {
      id
      email
      name
      mobile
    }
  }
`;

export const loginMutation = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;
