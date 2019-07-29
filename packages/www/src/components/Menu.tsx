import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';

const UL = styled.ul`
  display: inline;
`;

const LI = styled.li`
  list-style: none;
  a {
    transition: color 0.2s ease-in;
    color: orange;
    :hover {
      color: orangered;
    }
  }
`;

const Menu = () => {
  return (
    <div>
      <UL>
        <LI>
          <Link href="/">
            <a>Home</a>
          </Link>
        </LI>
        <LI>
          <Link href="/about">
            <a>About Us</a>
          </Link>
        </LI>
        <LI>
          <Link href="/category">
            <a>Categories</a>
          </Link>
        </LI>
        <LI>
          <Link href="/contact">
            <a>Contact Us</a>
          </Link>
        </LI>
      </UL>
    </div>
  );
};

export default Menu;
