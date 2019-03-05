interface Menu {
  id: number;
  link: string;
  linkText: string;
}

export const menuItems: Menu[] = [
  { id: 1, link: '/', linkText: 'Home' },
  { id: 2, link: '/about', linkText: 'About Us' },
  { id: 3, link: '/contact', linkText: 'Contact Us' },
  { id: 4, link: '/product', linkText: 'Products' },
];
