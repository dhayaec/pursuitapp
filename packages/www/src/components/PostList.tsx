import React from 'react';
import { useQuery } from 'urql';
import gql from 'graphql-tag';

const allPostsQuery = gql`
  query {
    getMainCategory {
      id
      name
      slug
      children {
        id
        name
        slug
      }
    }
  }
`;

const allPostsQueryVars = {
  skip: 0,
  first: 10,
};

export default function PostList() {
  const [allPostsResult]: any = useQuery({
    query: allPostsQuery,
    variables: allPostsQueryVars,
  });

  if (allPostsResult.error) {
    return <span>Error loading posts</span>;
  } else if (allPostsResult.loading || !allPostsResult.data) {
    return <div>Loading</div>;
  }

  const { getMainCategory } = allPostsResult.data;

  return (
    <section>
      <ul>
        {getMainCategory.map((post, i) => (
          <li key={post.id}>
            <div>
              <span>{i + 1}. </span>
              <a href={`category/${post.slug}`}>{post.name}</a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
