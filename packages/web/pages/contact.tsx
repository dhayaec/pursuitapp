import { HeaderNavMenu } from '../components/HeaderNavMenu';
import { CustomButton } from '@pursuitapp/ui';

export default () => (
  <div>
    <HeaderNavMenu />
    <h1>Contact Us</h1>
    <form action="">
      <label htmlFor="name">
        Full Name
        <input type="text" />
      </label>
      <CustomButton>Save</CustomButton>
    </form>
  </div>
);
