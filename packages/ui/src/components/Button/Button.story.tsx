import { action } from '@storybook/addon-actions';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Button } from '.';

storiesOf('Button', module)
  .add('with text', () => <Button>text</Button>)
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        hey
      </span>
    </Button>
  ));
