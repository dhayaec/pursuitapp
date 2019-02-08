import gql from 'graphql-tag';

export const newNotificationSub = gql`
  subscription NewNotification {
    newNotification {
      id
      message
    }
  }
`;
