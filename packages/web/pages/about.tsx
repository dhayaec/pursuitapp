import * as React from 'react';
import { Button, Tooltip } from 'reakit';
import Header from '../components/ui/Header';
import { menuItems } from '../lib/data';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Header logo="MyWebsite" menuItems={menuItems} />
        <Button>
          Save
          <Tooltip>By Saving you agree to our terms of services</Tooltip>
        </Button>
      </div>
    );
  }
}
