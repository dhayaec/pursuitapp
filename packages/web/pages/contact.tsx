import { CustomButton } from '@pursuitapp/ui';
import { HeaderNavMenu } from '../components/HeaderNavMenu';

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
