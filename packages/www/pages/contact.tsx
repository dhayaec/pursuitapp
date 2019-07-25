import React from 'react';
import Menu from '../src/components/Menu';
import { addAll } from '../src/utils/utils';
import { Button } from '../src/components/Button';

const Contact = () => {
  return (
    <div>
      <Menu></Menu>
      <h1>Contact Us</h1>
      <p>Addition of (2,2,4) is equal to {addAll(2, 2, 4)}</p>
      <Button>Click Here</Button>
    </div>
  );
};

export default Contact;
