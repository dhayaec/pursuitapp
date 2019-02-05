import { gql } from 'apollo-boost';

export const getMainCategoryQuery = gql`
  query GetMainCategory {
    getMainCategory {
      id
      name
      slug
    }
  }
`;

export const getCategoryBySlugQuery = gql`
  query GetCategoryBySlug($slug: String!) {
    getCategoryBySlug(slug: $slug) {
      id
      name
      slug
    }
  }
`;
