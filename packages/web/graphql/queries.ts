import { gql } from 'apollo-boost';

export const getMainCategoryQuery = gql`
  query MainCategory {
    getMainCategory {
      id
      name
      slug
    }
  }
`;

export const getCategoryBySlugQuery = gql`
  query CategoryBySlug($slug: String!) {
    getCategoryBySlug(slug: $slug) {
      id
      name
      slug
    }
  }
`;

export const getProductsByCategoryQuery = gql`
  query ProductsByCategory($categoryId: String!) {
    getProductsByCategory(categoryId: $categoryId) {
      id
      title
      description
      price
      offerPrice
    }
  }
`;
