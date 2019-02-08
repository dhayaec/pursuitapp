import React from 'react';
import { HeaderNavMenu } from '../components/HeaderNavMenu';
import { NormalSubscriptionComponent } from '../generated/apolloComponents';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <HeaderNavMenu />
        <h2>Categories</h2>
        <NormalSubscriptionComponent>
          {({ data }) => {
            if (!data) {
              return null;
            }
            if (data.normalSubscription) {
              return (
                <div>
                  <p>{data.normalSubscription.id}</p>
                  <p>{data.normalSubscription.message}</p>
                </div>
              );
            }
          }}
        </NormalSubscriptionComponent>
      </div>
    );
  }
}
