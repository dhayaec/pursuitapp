import * as React from 'react';
import { Grid } from 'reakit';
import { HeaderNavMenu } from '../components/HeaderNavMenu';

const template = `
  "a a a" 60px
  "b c c" minmax(200px, 1fr)
  "d d d" 100px / 150px
`;

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <HeaderNavMenu />
        <Grid template={template}>
          <Grid.Item area="a" backgroundColor="orange">
            Header
          </Grid.Item>
          <Grid.Item area="b" backgroundColor="green">
            <ul>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
              <li>This is a sample</li>
            </ul>
          </Grid.Item>
          <Grid.Item area="c" backgroundColor="papayawhip">
            Content
          </Grid.Item>
          <Grid.Item area="d" backgroundColor="yellow">
            Footer
          </Grid.Item>
        </Grid>
      </div>
    );
  }
}
