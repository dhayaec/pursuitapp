import React from 'react';
import Error from 'next/error';
import Menu from '../../src/components/Menu';
import {
  CategoryBySlugDocument,
  GCategory,
} from '../../generated/urqlComponents';
import { MyAppProps } from '../_app';
import { apolloFetch } from '../../src/graphql/apollo-fetch';
import { print } from 'graphql';

interface CategoryDetailsProps {
  slug: string;
  getCategoryBySlug: GCategory;
  error: any;
  statusCode: number;
}

const CategoryDetails = ({
  slug,
  getCategoryBySlug,
  error,
  statusCode,
}: CategoryDetailsProps) => {
  return (
    <div>
      <Menu></Menu>
      <>
        {getCategoryBySlug && (
          <>
            <p>{slug}</p>
            <p>{getCategoryBySlug.id}</p>
            <p>{getCategoryBySlug.name}</p>
            <p>{getCategoryBySlug.slug}</p>
          </>
        )}

        {error && <Error title={error.message} statusCode={statusCode} />}
      </>
    </div>
  );
};

CategoryDetails.getInitialProps = async ({ query, res }: MyAppProps) => {
  const { slug } = query;
  let statusCode = 0;
  try {
    const result = await apolloFetch({
      query: print(CategoryBySlugDocument),
      variables: { slug },
    });
    if (result.data && result.data.getCategoryBySlug) {
      const {
        data: { getCategoryBySlug },
      } = result;
      return { slug, getCategoryBySlug };
    }
    if (result.errors) {
      statusCode = 404;
      res.statusCode = statusCode;
      return { error: result.errors[0], slug, statusCode };
    }
  } catch (error) {
    console.log(error);
    statusCode = 500;
    res.statusCode = statusCode;
    res.end();
    return { error, statusCode };
  }
  return { slug };
};

export default CategoryDetails;
