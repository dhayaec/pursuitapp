import Link from 'next/link';
import React from 'react';
import { Card, Heading, Image, List, Paragraph } from 'reakit';
import styled from 'styled-components';
import Header from '../components/ui/Header';
import { MainCategoryComponent } from '../generated/apolloComponents';

const AppContainer = styled.div`
  width: 80%;
  background: #fff;
  display: flex;
  justify-content: space-between;
  margin: auto;
  @media screen and (max-width: 600px) {
    width: 100%;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
  }
`;

const BannerBox = styled.div`
  flex: 4;
`;

const SideBarBox = styled.div`
  flex: 1;
  padding-left: 1rem;
`;

const Spacer = styled.div`
  height: 1rem;
`;

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <Header logo="MyWebsite" />
        <Spacer />
        <AppContainer>
          <BannerBox>
            <Image
              src="https://placekitten.com/600/200"
              width="100%"
              height="300"
            />
          </BannerBox>
          <SideBarBox>
            <List>
              <MainCategoryComponent>
                {({ data, error, loading }) => {
                  if (loading) {
                    return <p>Loading... </p>;
                  }

                  if ((data && !data.getMainCategory) || error) {
                    return <p>No data</p>;
                  }

                  return data.getMainCategory.map(item => (
                    <li key={item.slug}>
                      <Link
                        href={`/category/?slug=${item.slug}`}
                        as={`/category/${item.slug}`}
                      >
                        <a>{item.name}</a>
                      </Link>
                    </li>
                  ));
                }}
              </MainCategoryComponent>
            </List>
          </SideBarBox>
        </AppContainer>
        <Spacer />
        <AppContainer>
          {[...new Array(4)].map((_, i) => (
            <Card key={i}>
              <Card.Fit
                use={Image}
                src="https://placekitten.com/300/320"
                alt="Kitten"
                width={320}
                height={300}
              />
              <Paragraph>Description for Card</Paragraph>
            </Card>
          ))}
        </AppContainer>
        <Spacer />
        <AppContainer>
          <Heading>Welcome to my website</Heading>
        </AppContainer>
      </div>
    );
  }
}
