import Link from 'next/link';
import * as React from 'react';
import { MainCategoryComponent } from '../generated/apolloComponents';

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
        <li key={item.path} style={{ listStyle: 'none' }}>
          <Link key={i} href={item.path} as={item.path}>
            <a>{item.pageName}</a>
          </Link>
        </li>
      ))}
    </ul>
    <MainCategoryComponent>
      {({ data, error }) => {
        if (!data.getMainCategory || error) {
          return <p>No data</p>;
        }
        return data.getMainCategory.map(item => (
          <li key={item.slug}>
            <Link
              href={`/category/?slug=${item.slug}`}
              as={`/category/${item.slug}`}
            >
              <a>{item.name}</a>
            </Link>
          </li>
        ));
      }}
    </MainCategoryComponent>
  </div>
);
