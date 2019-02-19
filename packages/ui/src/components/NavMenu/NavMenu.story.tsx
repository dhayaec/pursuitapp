import { storiesOf } from '@storybook/react';
import * as React from 'react';
import NavMenu from '.';

const menuList = [
  {
    id: 1,
    link: '/',
    text: 'Home',
    isActive: true,
  },
  {
    id: 2,
    link: '/about',
    text: 'About Us',
    isActive: false,
  },
  {
    id: 3,
    link: '/contact',
    text: 'Contact Us',
    isActive: false,
  },
  {
    id: 4,
    link: '/categories',
    text: 'Categories',
    isActive: false,
  },
];

storiesOf('NavMenu', module).add('with text', () => (
  <NavMenu menuList={menuList} />
));
