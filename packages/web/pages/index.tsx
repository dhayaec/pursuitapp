import { Header } from '@pursuitapp/ui';
import React from 'react';
import { HeaderNavMenu } from '../components/HeaderNavMenu';
import { LoginComponent } from '../generated/apolloComponents';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <HeaderNavMenu />
        <LoginComponent>
          {mutate => (
            <button
              onClick={async () => {
                const response = await mutate({
                  variables: { email: 'test@test.com', password: 'password' },
                });

                console.log(response);
              }}
            >
              call login mutation
            </button>
          )}
        </LoginComponent>
        <Header>Welcome to my web site</Header>
      </div>
    );
  }
}
