import { ApolloClient, NormalizedCacheObject } from 'apollo-boost';
import App, { Container, NextAppContext } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'reakit';
import theme from 'reakit-theme-default';
import { GlobalStyle } from '../components/GlobalStyleSheet';
import withApollo from '../lib/withApollo';

interface NextAppContextExtended extends NextAppContext {
  apolloClient: ApolloClient<NormalizedCacheObject>;
}

class PursuitApp extends App<NextAppContextExtended> {
  render() {
    const { Component, pageProps, apolloClient } = this.props;
    return (
      <Provider theme={theme}>
        <Container>
          <GlobalStyle />
          <ApolloProvider client={apolloClient}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Container>
      </Provider>
    );
  }
}

export default withApollo(PursuitApp);
