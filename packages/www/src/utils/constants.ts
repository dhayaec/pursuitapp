export const PAGE_TITLES = {
  '/': 'Home',
  '/about': 'About Us',
  '/contact': 'Contact Us',
};

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export const CATEGORY_LIST: Category[] = [
  {
    id: 1,
    name: 'One',
    slug: 'one',
    description: 'This is a sample description for category one',
  },
  {
    id: 2,
    name: 'Two',
    slug: 'two',
    description: 'This is a sample description for category 2',
  },
  {
    id: 3,
    name: 'Three',
    slug: 'three',
    description: 'This is a sample description for category Three #3',
  },
  {
    id: 4,
    name: 'Four',
    slug: 'four',
    description: 'This is a sample description for category #4',
  },
];

export const SERVER_ENDPOINT = 'http://localhost:4000/graphql';
