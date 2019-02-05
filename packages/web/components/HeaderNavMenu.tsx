import Link from 'next/link';
import * as React from 'react';

const pages = [
  {
    path: '/',
    pageName: 'Home',
  },
  {
    path: '/about',
    pageName: 'About Us',
  },
  {
    path: '/contact',
    pageName: 'Contact Us',
  },
  {
    path: '/register',
    pageName: 'Register',
  },
  {
    path: '/login',
    pageName: 'Login',
  },
];

export const HeaderNavMenu: React.SFC = () => (
  <div>
    <ul>
      {pages.map((item, i) => (
        <li style={{ listStyle: 'none' }}>
          <Link key={i} href={item.path} as={item.path}>
            <a>{item.pageName}</a>
          </Link>
        </li>
      ))}
    </ul>
  </div>
);
