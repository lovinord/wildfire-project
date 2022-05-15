import { createContext, useEffect, useState } from "react";
export const UserContext = createContext();

const BACKEND_API = "https://wildfire-project.herokuapp.com";

const UserContextProvider = (props) => {
  const [loggedInUser, setLoggedInUser] = useState();
  const [showModal, setShowModal] = useState(false);

  const baseURL = `${BACKEND_API}/api/user`;

  useEffect(() => {
    //whoami();
    // eslint-disable-next-line
  }, []);

  const whoami = async () => {
    let result = await fetch(`${baseURL}/whoami`, {
      method: "GET",
      credentials: "include",
    });
    result = await result.json();
    setLoggedInUser(result);
    return result;
  };

  const login = async (logInUser) => {
    let result = await fetch(`${baseURL}/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(logInUser),
    });
    result = await result.json();
    setLoggedInUser(result.loggedInUser);
    //await whoami();
    return result;
  };

  const logout = async () => {
    let logout = await fetch(`${baseURL}/logout`, {
      method: "POST",
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    await logout.json();
    setLoggedInUser();
    //await whoami();
  };

  const signup = async (createdUser) => {
    let result = await fetch(`${baseURL}/signup`, {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(createdUser),
    });
    result = await result.json();
    return result;
  };

  const values = {
    login,
    signup,
    whoami,
    setShowModal,
    logout,
    loggedInUser,
    showModal,
  };

  return (
    <UserContext.Provider value={values}>{props.children}</UserContext.Provider>
  );
};

export default UserContextProvider;
