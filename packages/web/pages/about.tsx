import { Button } from '@pursuitapp/ui';
import * as React from 'react';
import { HeaderNavMenu } from '../components/HeaderNavMenu';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <HeaderNavMenu />
        <Button>hello from ui package</Button>;
      </div>
    );
  }
}
