import React from 'react';
import { Card, Heading, Image, Paragraph } from 'reakit';
import { Container } from '../components/ui/Container';
import Header from '../components/ui/Header';
import { NormalSubscriptionComponent } from '../generated/apolloComponents';

const Product = () => (
  <div>
    <Header />
    <Container>
      <div>
        <NormalSubscriptionComponent>
          {({ data }) => {
            if (data && data.normalSubscription) {
              const { id, message } = data.normalSubscription;
              return (
                <div>
                  <p>{id}</p>
                  <p>{message}</p>
                </div>
              );
            }
            return <p>No response</p>;
          }}
        </NormalSubscriptionComponent>
      </div>
      <div>
        <Heading>Products</Heading>
      </div>
      <div>
        <Heading use="h2">Sub title goes here</Heading>
      </div>
      <div>
        <Heading use="h3">Sub sub title goes here</Heading>
      </div>
      <div>
        <Card>
          <Card.Fit
            src="https://placekitten.com/500/500"
            alt="Kitten"
            use={Image}
            height="500"
            width="500"
          />
          <Paragraph>Hello World!</Paragraph>
        </Card>
      </div>
    </Container>
  </div>
);

export default Product;
