import { Header } from '@pursuitapp/ui';
import Link from 'next/link';
import React from 'react';
import { HeaderNavMenu } from '../components/HeaderNavMenu';
import { GetMainCategoryComponent } from '../generated/apolloComponents';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <HeaderNavMenu />
        <h2>Categories</h2>
        <GetMainCategoryComponent>
          {({ data, error }) => {
            if (!data || error) {
              return <p>No data</p>;
            }
            return (
              data &&
              data.getMainCategory.map(item => (
                <li key={item.slug}>
                  <Link href={`/category/${item.slug}`}>
                    <a>{item.name}</a>
                  </Link>
                </li>
              ))
            );
          }}
        </GetMainCategoryComponent>
        <Header>Welcome to my web site</Header>
      </div>
    );
  }
}
