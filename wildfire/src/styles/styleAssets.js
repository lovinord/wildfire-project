import styled from "styled-components";

const MenuHeader = styled.h1`
  padding: 5.5rem 0rem 2.5rem 0rem;
  font-weight: normal;
  font-size: 2.3rem;

  @media (min-width: 768px) {
    font-size: 3.6rem;
    padding: 3.5rem 0rem;
  }

  @media (min-width: 1024px) {
    font-size: 3rem;
    padding: 3.5rem 0rem;
  }
`;

const InputText = styled.input`
  width: 250px;
  height: 50px;
  line-height: 50px;
  color: #333;
  font-size: 0.9rem;
  padding: 0rem 0.5rem;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  border: none;
  outline: none;
  display: block;
  transition: all 0.3s;

  @media (min-width: 768px) {
    width: 350px;
    height: 50px;
    line-height: 60px;
    color: #333;
    font-size: 1rem;
  }

  @media (min-width: 1024px) {
    width: 260px;
    height: 50px;
    font-size: 1.1rem;
  }
`;

const Button = styled.button`
  text-align: center;
  text-decoration: none;
  display: inline-block;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  background: black;
  color: #ffb218;
  width: 155px;
  font-size: 18px;
  height: 40px;
  padding: 10px 32px;
  border-radius: 5px;

  &: hover {
    /*     padding: 10px;
    box-shadow: 2px 2px 10px #b4872d;
    transition: 0.3s; */
  }

  @media (min-width: 768px) {
    /*     width: 160px;
    font-size: 21px;
    height: 50px; */
  }

  @media (min-width: 1024px) {
    /*     width: 175px;
    height: 54px; */
  }
`;

const CloseButton = styled.button`
  cursor: pointer;
  font-size: 38px;
  border: none;
  border-radius: 5px;
  background: inherit;

  @media (min-width: 1024px) {
  }
`;

const StyledComponent = styled.div`
  // your styles
`;

export { Button, MenuHeader, InputText, CloseButton, StyledComponent };
