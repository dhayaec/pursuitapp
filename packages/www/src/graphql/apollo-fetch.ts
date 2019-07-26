import { createApolloFetch } from 'apollo-fetch';
import { SERVER_ENDPOINT } from '../utils/constants';

export const apolloFetch = createApolloFetch({
  uri: SERVER_ENDPOINT,
});
