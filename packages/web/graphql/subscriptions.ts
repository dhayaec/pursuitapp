import gql from 'graphql-tag';

export const normalSubscription = gql`
  subscription NormalSubscription {
    normalSubscription {
      id
      message
    }
  }
`;
