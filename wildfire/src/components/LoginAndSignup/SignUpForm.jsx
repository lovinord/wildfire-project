import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContext";
import { MenuContext } from "../../contexts/MenuContext";
import styled from "styled-components";
import { Button, MenuHeader, InputText } from "../../styles/styleAssets";

function SignUpForm() {
  const { signup, login } = useContext(UserContext);
  const { goBackBtn } = useContext(MenuContext);
  const [email, setEmail] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    {
      const createdUser = {
        email,
        password,
      };
      let result = await signup(createdUser);
      await login(createdUser);
      navigate("/menu/dashboard");
      if (result.error) {
        if (result.error.includes("email")) {
          setEmailExists(true);
          return;
        }
      }
    }
  };

  return (
    <>
      <Header>Wildfire</Header>
      <LoginForm onSubmit={handleSubmit}>
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
          {emailExists && (
            <p style={{ margin: "5px 0px" }}>Email already exists</p>
          )}
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
        <SignUpBtn>Create Account</SignUpBtn>
        <GoBackBtn onClick={goBackBtn}>
          <LeftArrow />
          Go back
        </GoBackBtn>
      </LoginForm>
    </>

    /*     <div>
      <form onSubmit={handleSubmit}>
        Email
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => handleInputChange(e, setEmail)}
        />
        {emailExists && <p>Email already exists</p>}
        Password
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => handleInputChange(e, setPassword)}
        />
        <button>Create account</button>
      </form>
    </div> */
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

const SignUpBtn = styled(Button)`
  width: 185px;
  height: 45px;
  align-self: center;

  @media (min-width: 768px) {
    width: 235px;
    height: 60px;
  }

  @media (min-width: 1024px) {
    width: 210px;
    height: 50px;
  }
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

export default SignUpForm;
