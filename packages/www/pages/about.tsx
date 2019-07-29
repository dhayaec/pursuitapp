import React from 'react';
import Menu from '../src/components/Menu';
import Head from 'next/head';

const About = () => {
  return (
    <div>
      <Head>
        <title>About Us</title>
      </Head>
      <Menu></Menu>
      <h1>About Us</h1>
    </div>
  );
};

export default About;
