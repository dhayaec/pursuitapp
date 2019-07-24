import * as React from 'react';
import { Button, Tooltip } from 'reakit';
import Header from '../components/ui/Header';
import {
  EmptyCartMutation,
  EmptyCartProps,
} from '../generated/apolloComponents';
import { emptyCartMutation } from '../graphql/mutations';
import { MyContext } from '../utils/MyContext';

interface HomeState {
  readonly status: boolean;
  readonly name: string;
}

export default class Home extends React.Component<any, HomeState> {
  state: HomeState = {
    status: false,
    name: 'Hello',
  };

  static async getInitialProps({ apolloClient, ...ctx }: MyContext) {
    console.log(ctx);
    try {
      const e = await apolloClient.mutate<EmptyCartMutation, EmptyCartProps>({
        mutation: emptyCartMutation,
      });
      console.log(e);
      return { message: '1' };
    } catch (error) {
      console.log('error', error);
      return {};
    }
  }

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
        <p>{name}</p>
        <Button onClick={this.changeText}>
          Save
          <Tooltip>By Saving you agree to our terms of services</Tooltip>
        </Button>
      </div>
    );
  }
}
