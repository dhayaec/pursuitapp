import React from 'react';
import Menu from '../src/components/Menu';
import { addAll } from '../src/utils/web-utils';
import { Button } from '../src/components/Button';
import styled from '@emotion/styled';
import Head from 'next/head';

const Info = styled.p`
  color: red;
  padding: 1rem;
  font-family: sans-serif;
`;

const Contact = () => {
  return (
    <div>
      <Head>
        <title>Contact Us</title>
      </Head>
      <Menu></Menu>
      <h1>Contact Us</h1>
      <Info>Addition of (2,2,4) is equal to {addAll(2, 2, 4)}</Info>
      <Button>Click Here</Button>
    </div>
  );
};

export default Contact;
