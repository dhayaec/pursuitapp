import { storiesOf } from '@storybook/react';
import * as React from 'react';
import {
  LinkA,
  MenuLI,
  MenuToggle,
  MobileBar,
  NavbarContainer,
  NavbarHeader,
} from './';

storiesOf('NavbarHeader', module).add('default', () => (
  <NavbarContainer>
    <MenuToggle />
    <MobileBar>
      <label className="menu-icon">
        <span />
      </label>
    </MobileBar>
    <NavbarHeader>
      <nav>
        <ul>
          <MenuLI>
            <LinkA href="#">Item 1</LinkA>
          </MenuLI>
          <MenuLI>
            <LinkA href="#">Item 2</LinkA>
          </MenuLI>
          <MenuLI>
            <LinkA href="#">Item 3</LinkA>
          </MenuLI>
          <MenuLI>
            <LinkA href="#">Item 4</LinkA>
          </MenuLI>
          <MenuLI>
            <LinkA href="#">Item 5</LinkA>
          </MenuLI>
        </ul>
      </nav>
    </NavbarHeader>
  </NavbarContainer>
));
