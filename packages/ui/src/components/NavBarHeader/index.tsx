import styled from 'styled-components';

export const Logo = styled.img`
  height: 50px;
  margin: 20px;
`;

export const NavbarContainer = styled.div`
  width: 100%;
  background: #067bc2;
`;

export const MenuToggle = styled.input`
  display: none;
`;

export const MobileBar = styled.div`
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
  padding: 0 25px;
  width: 100%;
  height: 60px;
  background-color: #067bc2;
`;

export const NavbarHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding-top: 60px;
  width: 100%;
  background-color: #067bc2;
  overflow-y: scroll;
  text-align: center;
  color: #eee;
  -webkit-transition: opacity 300ms ease-in, visibility 0s ease-in 300ms;
  transition: opacity 300ms ease-in, visibility 0s ease-in 300ms;
`;

export const MenuLI = styled.li`
  display: inline-block;
  margin-right: 20px;
  font-family: 'Open Sans', sans-serif;
  font-size: 100%;
  color: #333;
  border: none;
`;

export const LinkA = styled.a`
  text-decoration: none;
  color: inherit;
  -webkit-transition: background-color 300ms ease-in;
  transition: background-color 300ms ease-in;
`;

export const MenuUL = styled.ul`
  list-style: none;
`;
