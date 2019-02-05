import React from 'react';
import {
  GetCategoryBySlugGetCategoryBySlug,
  GetCategoryBySlugProps,
  GetCategoryBySlugQuery,
} from '../generated/apolloComponents';
import { getCategoryBySlugQuery } from '../graphql/queries';
import { MyContext } from '../utils/MyContext';

interface Props {
  slug: string;
  category: GetCategoryBySlugGetCategoryBySlug;
  err: {};
}

export default class Category extends React.PureComponent<Props> {
  static async getInitialProps({
    query: { slug },
    apolloClient,
    ...ctx
  }: MyContext) {
    if (!slug) {
      return {};
    }

    const category = await apolloClient.query<
      GetCategoryBySlugQuery,
      GetCategoryBySlugProps
    >({
      query: getCategoryBySlugQuery,
      variables: {
        slug,
      },
    });

    if (!category.data.getCategoryBySlug) {
      ctx.res.statusCode = 404;
      return {
        slug,
        err: {
          statusCode: 404,
        },
      };
    }
    return { slug, category: category.data.getCategoryBySlug };
  }

  render() {
    const { slug, err } = this.props;

    if (err) {
      return <p>Not Found!</p>;
    }

    if (!slug) {
      return (
        <ul>
          <li>Main categories</li>
        </ul>
      );
    }

    const {
      category: { id, name },
    } = this.props;

    return (
      <div>
        <h1>{slug}</h1>
        <p>{name}</p>
        <p>{id}</p>
      </div>
    );
  }
}
