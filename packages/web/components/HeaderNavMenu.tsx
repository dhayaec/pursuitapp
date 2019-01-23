import Link from 'next/link';
import * as React from 'react';

const pages = [
  {
    path: '/',
    pageName: 'Home'
  },
  {
    path: '/about',
    pageName: 'About Us'
  },
  {
    path: '/contact',
    pageName: 'Contact Us'
  }
];

export const HeaderNavMenu: React.SFC = () => (
  <div>
    <ul>
      {pages.map((item, i) => (
        <Link key={i} href={item.path} as={item.path}>
          <a>{item.pageName}</a>
        </Link>
      ))}
      <li />
    </ul>
  </div>
);
