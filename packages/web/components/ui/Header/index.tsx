import NextLink from 'next/link';
import * as React from 'react';
import { Flex, Input, List } from 'reakit';
import styled from 'styled-components';

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  background-color: lightskyblue;
  color: white;
  padding: 0.5rem 1rem;
`;

const NavFlex = styled(Flex)`
  justify-content: space-around;
  flex-wrap: wrap;
  width: 80%;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;

const AppLogo = styled.div`
  align-self: center;
  font-size: 1.5rem;
  text-align: center;
  flex: 0.1;
  margin-right: 0.5rem;
  @media screen and (max-width: 600px) {
    font-size: 1.2rem;
  }
  a,
  a:hover {
    text-decoration: none;
  }
`;

const SearchInput = styled.input`
  align-self: center;
  flex: 3;
  height: 2.2em;
  @media screen and (max-width: 600px) {
    flex: 4;
  }
`;

const NavList = styled(List)`
  display: flex;
  justify-content: flex-end;
  flex: 3;
  li {
    margin-left: 3rem;
  }
  @media screen and (max-width: 600px) {
    flex: 0 1 100%;
    margin-top: 0.2rem;
    justify-content: space-around;
    li {
      margin: 0;
    }
  }
`;

const NavItem = styled.li`
  align-self: center;
  padding: 0.2rem;
`;

const NavLink = styled.a`
  color: #fff;
  text-decoration: none;
  :hover {
    color: #fafafa;
    text-decoration: underline;
  }
`;

interface Menu {
  id: number;
  link: string;
  linkText: string;
}

interface HeaderProps {
  logo: string;
  menuItems: Menu[];
}

export default class Header extends React.PureComponent<HeaderProps> {
  public static defaultProps = {
    logo: 'MyApp',
  };

  render() {
    const { logo, menuItems } = this.props;
    return (
      <NavContainer>
        <NavFlex>
          <AppLogo>
            <NextLink prefetch={true} href="/" passHref={true}>
              <NavLink>{logo}</NavLink>
            </NextLink>
          </AppLogo>
          <SearchInput as={Input} type="text" placeholder="Search..." />
          <NavList>
            {menuItems.length > 0 &&
              menuItems.map(i => (
                <NavItem key={i.link}>
                  <NextLink href={i.link} passHref={true}>
                    <NavLink>{i.linkText}</NavLink>
                  </NextLink>
                </NavItem>
              ))}
          </NavList>
        </NavFlex>
      </NavContainer>
    );
  }
}
