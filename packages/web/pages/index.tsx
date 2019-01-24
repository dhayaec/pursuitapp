import { add } from '@pursuitapp/common';
import { Header } from '@pursuitapp/ui';
import { HeaderNavMenu } from '../components/HeaderNavMenu';

export default () => (
  <div>
    <HeaderNavMenu />
    {add(1, 2)}
    <Header>Welcome to my web site</Header>
  </div>
);
