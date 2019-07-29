import React from 'react';
import Menu from '../src/components/Menu';
import Head from 'next/head';

const Home = () => {
  return (
    <div>
      <Head>
        <title>Home page</title>
      </Head>
      <Menu></Menu>
      <h1>Welcome Home</h1>
    </div>
  );
};

export default Home;
