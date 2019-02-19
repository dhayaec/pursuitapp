import * as React from 'react';
import {
  Block,
  Button,
  Card,
  Divider,
  Flex,
  Heading,
  Image,
  Paragraph,
  Tooltip,
} from 'reakit';
import {
  AppButton,
  AppCard,
  ErrorButton,
  NestedThing,
  StyledLink,
  Thing,
  WrapperArea,
} from '../components/ui/AppButton';
import Header from '../components/ui/Header';
import { menuItems } from '../lib/data';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Header logo="MyWebsite" menuItems={menuItems} />
        <Flex
          background="#555"
          color="white"
          padding={8}
          justifyContent="center"
        >
          <Block>Apples</Block>
          <Divider vertical={true} />
          <Block>Oranges</Block>
          <Divider vertical={true} />
          <Block>Grape</Block>
          <Divider vertical={true} />
          <Block>Pineapple</Block>
          <Divider vertical={true} />
          <Block>Strawberry</Block>
        </Flex>
        <WrapperArea>
          <AppCard>
            <Heading use="h5">Card Heading</Heading>
            <Card.Fit
              use={Image}
              src="https://placekitten.com/400/300"
              alt="Kitten"
              width={300}
              height={300}
            />
            <Paragraph>Description for Card</Paragraph>
          </AppCard>
        </WrapperArea>
        <AppButton>Default Button</AppButton>
        <ErrorButton>Error Button</ErrorButton>
        <AppButton primary={true}>Primary Button</AppButton>
        <StyledLink className="test">test</StyledLink>
        <Thing>Test</Thing>
        <NestedThing>
          <p className="something">Test</p>
          Hello World!
        </NestedThing>
        <Button>
          Save
          <Tooltip>By Saving you agree to our terms of services</Tooltip>
        </Button>
      </div>
    );
  }
}
