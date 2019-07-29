import React from 'react';
import Link from 'next/link';
import Menu from '../../src/components/Menu';
import { MainCategoryComponent } from '../../generated/urqlComponents';
import withUrqlClient from '../../src/with-urql-client';
import { Provider, Client } from 'urql';
import { NextPageContext } from 'next';
import Head from 'next/head';

interface CategoryProps extends NextPageContext {
  urqlClient: Client;
}

const Category = ({ urqlClient }: CategoryProps) => {
  return (
    <div>
      <Head>
        <title>Categories</title>
      </Head>
      <Menu></Menu>
      <Provider value={urqlClient}>
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
                        <Link
                          href={`/category/[slug]`}
                          as={`/category/${c.slug}`}
                          prefetch={true}
                        >
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
      </Provider>
    </div>
  );
};

export default withUrqlClient(Category);
