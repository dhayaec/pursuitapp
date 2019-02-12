import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { CenteredTable, CenteredText } from '.';

storiesOf('WelcomeText', module).add('with text', () => (
  <CenteredTable>
    <CenteredText>text</CenteredText>
  </CenteredTable>
));
