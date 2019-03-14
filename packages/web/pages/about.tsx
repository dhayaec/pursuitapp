import * as React from 'react';
import { Button, Tooltip } from 'reakit';
import Header from '../components/ui/Header';

interface HomeState {
  readonly status: boolean;
  readonly name: string;
}

export default class Home extends React.Component<any, HomeState> {
  state: HomeState = {
    status: false,
    name: 'Hello',
  };

  changeText = () =>
    this.setState(state =>
      state.status
        ? { status: !state.status, name: 'Welcome' }
        : { status: !state.status, name: 'Goodbye!' },
    );

  render() {
    const { name } = this.state;
    return (
      <div>
        <Header logo="MyWebsite" />
        <h1>{name}</h1>
        <Button onClick={this.changeText}>
          Save
          <Tooltip>By Saving you agree to our terms of services</Tooltip>
        </Button>
      </div>
    );
  }
}
