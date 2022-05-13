import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { MenuContext } from "../../contexts/MenuContext";
import styled from "styled-components";
import { Button, MenuHeader, InputText } from "../../styles/styleAssets";
import { useNavigate } from "react-router-dom";

function LogInForm() {
  const { login } = useContext(UserContext);
  const { goBackBtn } = useContext(MenuContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const submitUser = async (e) => {
    e.preventDefault();
    if (email && password) {
      const logInUser = {
        email,
        password,
      };
      let result = await login(logInUser);
      navigate("/menu/dashboard");
      if (result.success) {
        return;
      }
    }
  };

  return (
    <>
      <Header>Wildfire</Header>
      <LoginForm onSubmit={submitUser}>
        <InputWrapper>
          <Label>Email</Label>
          <InputEmail
            type="email"
            id="email"
            value={email}
            placeholder="Enter your email"
            autoFocus
            onChange={(e) => handleInputChange(e, setEmail)}
          />
        </InputWrapper>
        {/*       {errorMessage && <p>Credentials don't exist</p>} */}
        <InputWrapper>
          <Label>Password</Label>
          <InputPassword
            type="password"
            id="password"
            value={password}
            placeholder="Enter your password"
            onChange={(e) => handleInputChange(e, setPassword)}
          />
        </InputWrapper>
        <LoginBtn>Log in</LoginBtn>
        <GoBackBtn onClick={goBackBtn}>
          <LeftArrow />
          Go back
        </GoBackBtn>
      </LoginForm>
    </>
  );
}

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 45px;

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }
`;

const Header = styled(MenuHeader)`
  @media (min-width: 768px) {
    padding-bottom: 2rem;
  }

  @media (min-width: 1024px) {
    padding-bottom: 3rem;
  }
`;

const InputWrapper = styled.div``;

const Label = styled.label`
  font-size: 1.1rem;

  @media (min-width: 768px) {
    font-size: 1.6rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.4rem;
  }
`;

const InputEmail = styled(InputText)`
  margin-top: 5px;
`;
const InputPassword = styled(InputText)`
  margin-top: 5px;
`;

const LoginBtn = styled(Button)`
  align-self: center;
`;

const GoBackBtn = styled.p`
  position: absolute;
  bottom: 3.5rem;
  font-size: 1.1rem;
  text-decoration: underline;
  align-self: center;

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
`;

const LeftArrow = styled.i`
  text-decoration: underline;
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 3px;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
`;

export default LogInForm;
