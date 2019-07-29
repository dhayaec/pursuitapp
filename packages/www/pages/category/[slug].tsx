import React from 'react';
import Error from 'next/error';
import Menu from '../../src/components/Menu';
import {
  CategoryBySlugDocument,
  GCategory,
} from '../../generated/urqlComponents';
import { apolloFetch } from '../../src/graphql/apollo-fetch';
import { print } from 'graphql';
import withUrqlClient from '../../src/with-urql-client';
import { NextPageContext } from 'next';
import Head from 'next/head';

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
      <Head>
        <title>{getCategoryBySlug && getCategoryBySlug.name}</title>
      </Head>
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

CategoryDetails.getInitialProps = async ({ query, res }: NextPageContext) => {
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
      res ? (res.statusCode = statusCode = 404) : null;
      return { error: result.errors[0], slug, statusCode };
    }
  } catch (error) {
    res ? (res.statusCode = statusCode = 500) : null;
    res && res.end();
    return { error, statusCode };
  }
  return { slug };
};

export default withUrqlClient(CategoryDetails);
