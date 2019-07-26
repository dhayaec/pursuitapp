import React from 'react';
import App, { Container } from 'next/app';
import { Provider, Client } from 'urql';
import { NextPageContext } from 'next';
import Router from 'next/router';
import Head from 'next/head';
import withUrqlClient from '../src/with-urql-client';

export interface MyAppProps extends NextPageContext {
  urqlClient: Client;
}

interface NextAppProps {
  Component: any;
  ctx: NextPageContext;
}

class MyApp extends App<MyAppProps> {
  static async getInitialProps({ Component, ctx }: NextAppProps) {
    let pageProps = {};
    /**
     * Remove trailing slash in url & do a 301 redirect
     */
    const { url } = ctx.req;
    if (url.substr(-1) === '/') {
      const newUrl = url.substr(0, url.length - 1);
      if (ctx.res) {
        ctx.res.writeHead(301, {
          Location: newUrl,
        });
        ctx.res.end();
      } else {
        Router.push(newUrl);
      }
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, urqlClient } = this.props;

    return (
      <Container>
        <Head>
          <title>My new cool app</title>
          <link
            rel="shortcut icon"
            href="/static/favicon.ico"
            type="image/x-icon"
          />
        </Head>
        <Provider value={urqlClient}>
          <Component {...pageProps} />
        </Provider>
      </Container>
    );
  }
}

export default withUrqlClient(MyApp);
