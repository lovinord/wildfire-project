import { createContext, useState } from "react";

export const TreeContext = createContext();
const BACKEND_API = process.env.BACKEND_API | "http://localhost:3001";

const TreeContextProvider = (props) => {
  const [deadTree, setDeadTree] = useState([]);

  const baseURL = `${BACKEND_API}/api/tree`;

  const resetTreeContext = () => {
    setDeadTree([]);
  };
  const getDeadTreesByUser = async (userId) => {
    let result = await fetch(`${baseURL}/${userId}/trees`, {
      method: "GET",
      credentials: "include",
    });
    result = await result.json();
    if (!result.error) {
      let resultFilter = result?.map((el) => el?.treeIndex);
      setDeadTree(resultFilter);
    }

    return result;
  };

  const createDeadTree = async (tree) => {
    let result = await fetch(`${baseURL}/killtree`, {
      credentials: "include",
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(tree),
    });
    result = await result.json();
    return result;
  };

  const values = {
    createDeadTree,
    getDeadTreesByUser,
    deadTree,
    resetTreeContext,
  };

  return (
    <TreeContext.Provider value={values}>{props.children}</TreeContext.Provider>
  );
};

export default TreeContextProvider;
