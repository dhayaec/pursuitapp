import { Link, List, Navigation } from 'reakit';

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

export const HeaderNavMenu = () => (
  <Navigation sticky={true}>
    <List>
      {pages.map(item => (
        <li key={item.path}>
          <Link href={item.path}>{item.pageName}</Link>
        </li>
      ))}
    </List>
  </Navigation>
);
