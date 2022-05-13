import { createContext, useContext, useState } from "react";
import { UserContext } from "./UserContext";
import { TaskContext } from "./TaskContext";
import { TreeContext } from "./TreeContext";

import { useNavigate } from "react-router-dom";

export const MenuContext = createContext();

const MenuContextProvider = (props) => {
  const [toggleNavbar, setToggleNavbar] = useState(false);
  const { loggedInUser, logout } = useContext(UserContext);
  const { resetTaskContext } = useContext(TaskContext);
  const { resetTreeContext } = useContext(TreeContext);

  const navigate = useNavigate();

  const menuBtn = () => {
    setToggleNavbar(!toggleNavbar);
    if (!loggedInUser) {
      navigate("/menu/welcome");
    } else {
      navigate("/menu/dashboard");
    }
  };

  const closeBtn = () => {
    setToggleNavbar(!toggleNavbar);
    if (!loggedInUser) {
      // change "you have to be logged in" eller redirect
      navigate("/");
    } else {
      navigate("/menu/dashboard");
    }
  };

  const loginClick = () => {
    navigate("/menu/sign-in");
  };

  const signupClick = () => {
    navigate("/menu/register");
  };

  const goBackBtn = () => {
    navigate("/menu/welcome");
  };

  const handleLogout = () => {
    logout();
    resetTaskContext();
    resetTreeContext();
    navigate("/");
    setToggleNavbar(!toggleNavbar);
  };

  const values = {
    loginClick,
    signupClick,
    menuBtn,
    closeBtn,
    toggleNavbar,
    setToggleNavbar,
    goBackBtn,
    handleLogout,
  };

  return (
    <MenuContext.Provider value={values}>{props.children}</MenuContext.Provider>
  );
};

export default MenuContextProvider;
