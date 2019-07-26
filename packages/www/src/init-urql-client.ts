import {
  createClient,
  dedupExchange,
  cacheExchange,
  fetchExchange,
  ssrExchange,
  Client,
} from 'urql';
import 'isomorphic-unfetch';
import { SSRExchange } from 'urql/dist/types/exchanges/ssr';
import { SERVER_ENDPOINT } from './utils/constants';

let urqlClient: Client;
let ssrCache: SSRExchange;

export default function initUrqlClient(initialState = {}) {
  // Create a new client for every server-side rendered request to reset its state
  // for each rendered page
  // Reuse the client on the client-side however
  const isServer = typeof window === 'undefined';
  if (isServer || !urqlClient) {
    ssrCache = ssrExchange({ initialState });

    urqlClient = createClient({
      url: SERVER_ENDPOINT,
      // Active suspense mode on the server-side
      suspense: isServer,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    });
  }

  // Return both the cache and the client
  return [urqlClient, ssrCache];
}
