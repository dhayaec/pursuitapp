import React from 'react';
import Error from 'next/error';
import { CATEGORY_LIST, Category } from '../../src/utils/constants';
import Menu from '../../src/components/Menu';

interface CategoryDetailsProps {
  slug: string;
  category: Category;
  errorCode?: number;
}

const CategoryDetails = ({
  slug,
  category,
  errorCode,
}: CategoryDetailsProps) => {
  return (
    <div>
      <Menu></Menu>
      {errorCode ? (
        <Error statusCode={errorCode} />
      ) : (
        <>
          <h1>{category.name}</h1>
          <p>Page: {slug}</p>
          <p>{category.description}</p>
        </>
      )}
    </div>
  );
};

CategoryDetails.getInitialProps = async ({ query, res }) => {
  const { slug } = query;

  let errorCode = 0;

  const c = CATEGORY_LIST.filter(x => x.slug === slug);

  if (!c.length) {
    res.statusCode = 404;
    errorCode = 404;
  }

  return { slug, category: c[0], errorCode };
};

export default CategoryDetails;
