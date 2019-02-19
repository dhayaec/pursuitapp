import * as React from 'react';
import { styled } from 'reakit';
import HamburgerIcon from '../HamburgerIcon';

const Nav = styled.div`
  overflow: hidden;
  background-color: #333;
  @media screen and (max-width: 600px) {
    a:not(:first-child) {
      display: none;
    }
    a.icon {
      float: right;
      display: block;
    }
  }
`;

const NavLink = styled.a`
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
  &:hover {
    background-color: #ddd;
    color: black;
  }
  @media screen and (max-width: 600px) {
    a {
      float: none;
      display: block;
      text-align: left;
    }
  }
`;

const NavLinkIcon = styled.a`
  display: none;
  @media screen and (max-width: 600px) {
    .responsive {
      position: relative;
    }
    .responsive .icon {
      position: absolute;
      right: 0;
      top: 0;
    }
    .responsive a {
      display: block;
    }
  }
`;

interface Menu {
  id: number;
  link: string;
  text: string;
  isActive: boolean;
}

export interface NavMenuProps {
  menuList: Menu[];
}

export default class NavMenu extends React.Component<NavMenuProps> {
  state = {
    open: false,
  };

  toggle = (e: any) => {
    e.preventDefault();
    this.setState({ open: !this.state.open });
  };

  render() {
    const { open } = this.state;
    const { menuList } = this.props;
    return (
      <Nav className={open ? 'responsive' : ''}>
        {menuList.map(item => (
          <NavLink
            key={item.id}
            href={item.link}
            className={item.isActive ? 'active' : ''}
          >
            {item.text}
          </NavLink>
        ))}
        <NavLinkIcon className="icon" onClick={this.toggle}>
          <HamburgerIcon open={open} />
        </NavLinkIcon>
      </Nav>
    );
  }
}
