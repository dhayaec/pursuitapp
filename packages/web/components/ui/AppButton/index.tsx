import { Card } from 'reakit';
import styled from 'styled-components';

interface Props {
  primary?: boolean;
}

export const AppButton = styled.button`
  background: ${(p: Props) => (p.primary ? 'blue' : 'white')};
  color: ${(p: Props) => (p.primary ? 'white' : 'blue')};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid blue;
  border-radius: 3px;
`;

export const ErrorButton = styled(AppButton)`
  border-color: tomato;
  color: tomato;
`;

const Link = ({ className, children }) => (
  <a className={className}>{children}</a>
);

export const StyledLink = styled(Link)`
  color: olivedrab;
  font-weight: bold;
`;

export const Thing = styled.button`
  color: blue;

  ::before {
    content: '🚀';
  }

  :hover {
    color: red;
  }
`;

export const NestedThing = styled.div`
  color: blue;
  .something {
    border: 1px solid;
    display: block;
  }
`;

export const WrapperArea = styled.div`
  width: 100%;
  background: #f0f0f0;
  padding: 10px;
  text-align: center;
`;

export const AppCard = styled(Card)`
  border-radius: 5px;
  border: 1px solid #ddd;
`;
