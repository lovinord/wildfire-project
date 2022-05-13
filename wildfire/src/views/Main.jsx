import React, { useContext } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { CloseButton } from "../styles/styleAssets";
import { MenuContext } from "../contexts/MenuContext";
import { UserContext } from "../contexts/UserContext";
import LoginOrSignup from "../components/LoginAndSignup/LoginOrSignup";
import LoginForm from "../components/LoginAndSignup/LogInForm";
import SignupForm from "../components/LoginAndSignup/SignUpForm";
import Welcome from "../components/Welcome";
import Dashboard from "../components/Dashboard";
import Horizon from "../components/DashboardComponents/TreeView/Background";

const Main = () => {
  const { toggleNavbar, menuBtn, closeBtn } = useContext(MenuContext);
  const { loggedInUser } = useContext(UserContext);

  const location = useLocation();

  return (
    <>
      <>
        {loggedInUser ? (
          <>
            <Horizon />
          </>
        ) : (
          <>
            <Welcome />
          </>
        )}
      </>
      <div>
        <MenuButton onClick={menuBtn} toggleNavbar={toggleNavbar}>
          <Hamburger></Hamburger>
          <Hamburger></Hamburger>
          <Hamburger></Hamburger>
        </MenuButton>
        <SideNavWrapper>
          <SideNav toggleNavbar={toggleNavbar}>
            <CloseMain onClick={closeBtn} toggleNavbar={toggleNavbar}>
              &#10006;
            </CloseMain>
            {location.pathname.includes("/menu/welcome") && <LoginOrSignup />}
            {location.pathname.includes("/menu/sign-in") && <LoginForm />}
            {location.pathname.includes("/menu/register") && <SignupForm />}
            {location.pathname.includes("/menu/dashboard") && <Dashboard />}
          </SideNav>
        </SideNavWrapper>
      </div>
    </>
  );
};

const SideNavWrapper = styled.div`
  transition: margin-left 0.5s;
  padding: 20px;
`;

const SideNav = styled.div`
  white-space: nowrap;
  height: 100%;
  width: ${(props) => (props.toggleNavbar ? "100%" : "0%")};
  position: fixed;
  z-index: 10000;
  top: 0;
  right: 0;
  background: #ffb218;
  overflow-x: hidden;
  transition: ${(props) =>
    props.toggleNavbar
      ? "all 0.6s 0.2s ease-in-out"
      : "all 0.6s 0.2s ease-in-out"};
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
    width: ${(props) => (props.toggleNavbar ? "33%" : "0%")};
  }
`;

const MenuButton = styled.button`
  cursor: pointer;
  position: absolute;
  visibility: ${(props) => (props.toggleNavbar ? "hidden" : "visible")};
  opacity: ${(props) => (props.toggleNavbar ? "0" : "1")};
  transition: visibility 0.2s, opacity 1.2s linear;
  z-index: 1000;
  top: 15px;
  right: 25px;
  font-size: 36px;
  margin-left: 50px;
  border: none;
  background: inherit;
`;

const Hamburger = styled.div`
  width: 40px;
  height: 6px;
  background-color: black;
  margin: 6px 0;
  border-radius: 5px;
`;

const CloseMain = styled(CloseButton)`
  position: absolute;
  top: 10px;
  right: 30px;
  margin-left: 50px;
  display: ${(props) => (props.toggleNavbar ? "block" : "none")};
  z-index: 2;

  @media (min-width: 1024px) {
    position: relative;
    align-self: start;
  }
`;

export default Main;
