import { Header } from '@pursuitapp/ui';
import React from 'react';
import { HeaderNavMenu } from '../components/HeaderNavMenu';
import { NewNotificationComponent } from '../generated/apolloComponents';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <HeaderNavMenu />
        <h2>Categories</h2>
        <NewNotificationComponent>
          {({ data }) => <h4>{data && JSON.stringify(data)}</h4>}
        </NewNotificationComponent>
        <Header>Welcome to my web site</Header>
      </div>
    );
  }
}
