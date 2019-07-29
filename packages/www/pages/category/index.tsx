import React from 'react';
import Link from 'next/link';
import Menu from '../../src/components/Menu';
import { MainCategoryComponent } from '../../generated/urqlComponents';

const Category = () => {
  return (
    <div>
      <Menu></Menu>
      <MainCategoryComponent>
        {({ data, error }) => {
          if (data && data.getMainCategory) {
            const { getMainCategory } = data;
            return (
              <ul>
                {getMainCategory.map((c, i) => (
                  <li key={c.id}>
                    <div>
                      <span>{i + 1}. </span>
                      <Link href={`category/[slug]`} as={`category/${c.slug}`}>
                        <a>{c.name}</a>
                      </Link>
                    </div>
                  </li>
                ))}
                <li key={99}>
                  <div>
                    <span>0. </span>
                    <Link href={`category/blah/`} as={`category/blah/`}>
                      <a>Blah Blah</a>
                    </Link>
                  </div>
                </li>
              </ul>
            );
          }

          if (error) {
            return <p>{JSON.stringify(error)}</p>;
          }

          return <p>Loading...</p>;
        }}
      </MainCategoryComponent>
    </div>
  );
};

export default Category;
