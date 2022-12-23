import { useContext } from "react";
import styled from "styled-components";
import { Button, MenuHeader } from "../../styles/styleAssets";
import { MenuContext } from "../../contexts/MenuContext";
import React from "react";

function LoginOrSignup() {
  const { loginClick, signupClick } = useContext(MenuContext);

  return (
    <div>
      <Header>Wildfire</Header>
      <ButtonWrapper>
        <LoginButton onClick={loginClick}>Sign in</LoginButton>
        <RegisterButton onClick={signupClick}>Register</RegisterButton>
      </ButtonWrapper>
      {/*       <ParagraphLink>What is Wildfire?</ParagraphLink> */}
    </div>
  );
}

const Header = styled(MenuHeader)``;

/* const ParagraphLink = styled.p`
  position: absolute;
  bottom: 3.5rem;
  font-size: 1.1rem;
  text-decoration: underline;

  &: hover {
    cursor: pointer;
    color: #3f3b33;
  }

  @media (min-width: 768px) {
    bottom: 5.5rem;
    font-size: 1.4rem;
  }

  @media (min-width: 1024px) {
    bottom: 5.2rem;
    font-size: 1.5rem;
  }
`; */

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 30px;

  @media (min-width: 768px) {
    row-gap: 45px;
  }

  @media (min-width: 1024px) {
  }
`;

const LoginButton = styled(Button)``;
const RegisterButton = styled(Button)``;

export default LoginOrSignup;
