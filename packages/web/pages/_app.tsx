import App, { Container } from 'next/app';
import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { Provider } from 'reakit';
import theme from 'reakit-theme-default';
import { GlobalStyle } from '../components/GlobalStyleSheet';
import withApollo from '../lib/withApollo';

class PursuitApp extends App<any> {
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
