import React from 'react';
import Link from 'next/link';
import { CATEGORY_LIST } from '../../src/utils/constants';
import Menu from '../../src/components/Menu';

const Category = () => {
  return (
    <div>
      <Menu></Menu>
      <ul>
        {CATEGORY_LIST.map(i => (
          <li style={{ listStyle: 'none' }} key={i.id}>
            <Link href={`/category/${i.slug}`}>
              <a href={`/category/${i.slug}`}>{i.name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
