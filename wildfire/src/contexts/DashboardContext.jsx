import { createContext, useState, useContext } from "react";
import { TreeContext } from "../contexts/TreeContext";

export const DashboardContext = createContext();

const DashboardContextProvider = (props) => {
  const { deadTree } = useContext(TreeContext);
  const [openModal, setOpenModal] = useState(false);

  const noMoreTrees = deadTree.length === 15;

  const toggleNewTaskModal = () => {
    if (!noMoreTrees) {
      setOpenModal(!openModal);
    }
  };

  const values = {
    toggleNewTaskModal,
    openModal,
    noMoreTrees,
  };

  return (
    <DashboardContext.Provider value={values}>
      {props.children}
    </DashboardContext.Provider>
  );
};

export default DashboardContextProvider;
