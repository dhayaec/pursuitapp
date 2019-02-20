import React from 'react';
import Header from '../components/ui/Header';
import {
  CategoryBySlugGetCategoryBySlug,
  CategoryBySlugProps,
  CategoryBySlugQuery,
  ProductsByCategoryGetProductsByCategory,
  ProductsByCategoryProps,
  ProductsByCategoryQuery,
} from '../generated/apolloComponents';
import {
  getCategoryBySlugQuery,
  getProductsByCategoryQuery,
} from '../graphql/queries';
import { menuItems } from '../lib/data';
import { MyContext } from '../utils/MyContext';

interface Props {
  slug: string;
  category: CategoryBySlugGetCategoryBySlug;
  err: {};
  products: ProductsByCategoryGetProductsByCategory[];
}

export default class Category extends React.PureComponent<Props> {
  static defaultProps: Props = {
    slug: '',
    category: null,
    err: null,
    products: [],
  };

  static async getInitialProps({
    query: { slug },
    apolloClient,
    ...ctx
  }: MyContext) {
    if (!slug) {
      return this.defaultProps;
    }

    const category = await apolloClient.query<
      CategoryBySlugQuery,
      CategoryBySlugProps
    >({
      query: getCategoryBySlugQuery,
      variables: {
        slug,
      },
    });

    ctx.res.statusCode = 404;

    if (!category.data.getCategoryBySlug) {
      return {
        slug,
        err: {
          statusCode: 404,
        },
      };
    }

    const p = await apolloClient.query<
      ProductsByCategoryQuery,
      ProductsByCategoryProps
    >({
      query: getProductsByCategoryQuery,
      variables: {
        categoryId: category.data.getCategoryBySlug.id,
      },
    });

    if (p) {
      const products = p.data.getProductsByCategory;
      return { slug, category: category.data.getCategoryBySlug, products };
    }
  }

  render() {
    const { slug, err, products } = this.props;

    if (err) {
      return (
        <div>
          <Header menuItems={menuItems} />
          <p>Not Found!</p>;
        </div>
      );
    }

    if (!slug) {
      return (
        <div>
          <Header menuItems={menuItems} />
          <ul>
            <li>Main categories</li>
          </ul>
        </div>
      );
    }

    const {
      category: { id, name },
    } = this.props;

    return (
      <div>
        <Header menuItems={menuItems} />
        <h1>{slug}</h1>
        <p>{name}</p>
        <p>{id}</p>
        {products.length > 0 ? (
          products.map(item => {
            return (
              <div key={item.id}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            );
          })
        ) : (
          <p>No products in this category</p>
        )}
      </div>
    );
  }
}
