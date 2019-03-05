import { styled } from 'reakit';

export const FormContainer = styled.div`
  display: flex;
  margin: auto;
  justify-content: center;
  width: 30%;
  @media screen and (max-width: 600px) {
    width: 100%;
  }
  form {
    flex: 1;
    padding: 1rem;
  }
`;
