import { Card, Heading, Image, Paragraph, styled } from 'reakit';
import Header from '../components/ui/Header';
import { NormalSubscriptionComponent } from '../generated/apolloComponents';
import { menuItems } from '../lib/data';

const Container = styled.div`
  display: flex;
  margin: auto;
  flex-direction: column;
  align-items: center;
  align-content: flex-start;
`;

export default () => (
  <div>
    <Header menuItems={menuItems} />
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
