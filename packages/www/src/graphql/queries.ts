import gql from 'graphql-tag';

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
