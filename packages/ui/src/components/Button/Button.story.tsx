import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { Button } from '.';

storiesOf('Button', module).add('with text', () => <Button>text</Button>);
