import React from 'react';
import { Box, Card, Heading, Image, Text } from 'rebass';
import { HeaderNavMenu } from '../components/HeaderNavMenu';
import { NormalSubscriptionComponent } from '../generated/apolloComponents';

export default class Home extends React.Component {
  render() {
    const photo =
      'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=2048&q=20';
    return (
      <div>
        <HeaderNavMenu />
        <h2>Categories</h2>
        <NormalSubscriptionComponent>
          {({ data }) => {
            if (!data) {
              return null;
            }
            if (data.normalSubscription) {
              return (
                <div>
                  <p>{data.normalSubscription.id}</p>
                  <p>{data.normalSubscription.message}</p>
                </div>
              );
            }
          }}
        </NormalSubscriptionComponent>
        <Box width={256}>
          <Card p={1} borderRadius={2} boxShadow="0 0 16px rgba(0, 0, 0, .25)">
            <Image src={photo} />
            <Box px={2}>
              <Heading as="h3">Card</Heading>
              <Text fontSize={0}>Small meta text</Text>
            </Box>
          </Card>
        </Box>
        <Box m={10} color="white" bg="orange" p={3}>
          <h1>Welcome to my website</h1>
        </Box>
      </div>
    );
  }
}
