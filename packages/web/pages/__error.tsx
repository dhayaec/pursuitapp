import { NextContext } from 'next';
import { DefaultQuery } from 'next/router';
import React from 'react';
import Header from '../components/ui/Header';

interface MyError extends Error {
  statusCode?: number;
  name: string;
  message: string;
}

interface CustomNextContext extends NextContext<DefaultQuery> {
  err: MyError;
}

export default class Error extends React.Component<MyError> {
  static getInitialProps({ res, err }: CustomNextContext) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    return { statusCode };
  }

  render() {
    return (
      <div>
        <Header />
        <p>
          {this.props.statusCode
            ? `An error ${this.props.statusCode} occurred on server`
            : 'An error occurred on client'}
        </p>
      </div>
    );
  }
}
