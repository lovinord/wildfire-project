import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { MenuContext } from "../contexts/MenuContext";
import { DashboardContext } from "../contexts/DashboardContext";
import { TreeContext } from "../contexts/TreeContext";
import { TaskContext } from "../contexts/TaskContext";
import CreateNewTaskModal from "./DashboardComponents/CreateNewTask";
import ActiveTasks from "./DashboardComponents/ActiveTaskSection/ActiveTasks";
import OldTasks from "./DashboardComponents/OldTasksSection/OldTasks";
import styled from "styled-components";
import { Button } from "../styles/styleAssets";

function Dashboard() {
  const { loggedInUser } = useContext(UserContext);
  const { handleLogout } = useContext(MenuContext);
  const { toggleNewTaskModal, noMoreTrees } = useContext(DashboardContext);
  const { getDeadTreesByUser, deadTree, resetTreeContext } =
    useContext(TreeContext);
  const { deleteAllTasks } = useContext(TaskContext);

  const [removeConfirmation, setRemoveConfirmation] = useState(false);

  const currentMissedTasks = deadTree?.length;

  useEffect(() => {
    if (loggedInUser) {
      getDeadTreesByUser(loggedInUser.id);
    }
    // eslint-disable-next-line
  }, [loggedInUser]);

  const removeHistoryClick = () => {
    setRemoveConfirmation(true);
  };

  const HandleDeleteClick = () => {
    resetTreeContext();
    deleteAllTasks(loggedInUser?.id);
    setRemoveConfirmation(false);
  };
  return (
    <>
      {loggedInUser && (
        <DashboardWrapper>
          <CreateTaskButton disabled={noMoreTrees} onClick={toggleNewTaskModal}>
            Create new task
          </CreateTaskButton>
          <CreateNewTaskModal />
          <ActiveTasks />
          <OldTasks />
          <ScoreWrapper>
            {removeConfirmation ? (
              <RemoveConfirmation>
                <p>
                  Are you sure? <br /> This will remove all previous tasks.
                </p>
                <ButtonWrapper>
                  <CancelButton onClick={() => setRemoveConfirmation(false)}>
                    Cancel
                  </CancelButton>
                  <DeleteButton onClick={HandleDeleteClick}>
                    Remove
                  </DeleteButton>
                </ButtonWrapper>
              </RemoveConfirmation>
            ) : (
              <>
                <h2 style={{ fontWeight: "normal" }}>
                  {currentMissedTasks}/15 trees are burnt down.
                </h2>

                <>
                  {!noMoreTrees && (
                    <RemoveHistory onClick={removeHistoryClick}>
                      Do you want to start over?
                    </RemoveHistory>
                  )}
                </>
              </>
            )}
            <LogoutButton onClick={handleLogout}>Sign out &#8677;</LogoutButton>
          </ScoreWrapper>
        </DashboardWrapper>
      )}
    </>
  );
}

const DashboardWrapper = styled.div`
  width: 99%;
  height: 100%;
  padding: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LogoutButton = styled.p`
  font-family: "Gill Sans", "Gill Sans MT", sans-serif;
  font-size: 1.1rem;
  text-decoration: underline;
  background: inherit;
  position: absolute;
  bottom: 30px;
  right: 30px;

  &: hover {
    cursor: pointer;
    color: #3f3b33;
  }

  @media (min-width: 768px) {
    font-size: 1.4rem;
  }

  @media (min-width: 1024px) {
  }
`;

const CreateTaskButton = styled(Button)`
  opacity: ${(props) => (props.disabled ? "0.7" : "1")};
  cursor: ${(props) => (props.disabled ? "auto" : "pointer")};
  width: 200px;
  margin-top: 3rem;

  @media (min-width: 768px) {
    width: 250px;
  }

  @media (min-width: 1024px) {
    width: 230px;
    margin-top: 1rem;
  }
`;

const ScoreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }
`;

const RemoveHistory = styled(CreateTaskButton)`
  width: 250px;
  margin-top: 1rem;

  @media (min-width: 768px) {
    width: 250px;
  }

  @media (min-width: 1024px) {
    width: 230px;
    margin-top: 1rem;
  }
`;

const RemoveConfirmation = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 110px;
  box-shadow: rgb(229 153 0) 1px 2px 3px 2px inset;
  padding: 5px;
  border-radius: 5px;

  > p {
    font-size: 0.8rem;
    text-align: center;

    @media (min-width: 768px) {
      font-size: 1rem;
    }

    @media (min-width: 1024px) {
    }
  }

  @media (min-width: 768px) {
    width: 350px;
    padding: 10px;
  }

  @media (min-width: 1024px) {
    width: 350px;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 13px;
  margin-top: 10px;

  @media (min-width: 768px) {
    gap: 55px;
    padding: 5px;
  }

  @media (min-width: 1024px) {
  }
`;

const DeleteButton = styled(Button)`
  width: 55px;
  height: 25px;
  font-size: 0.7rem;

  &: hover {
    background: #2e2d29;
    transition: 0.3s;
  }

  @media (min-width: 768px) {
    height: 30px;
    width: 70px;
    font-size: 0.9rem;
  }

  @media (min-width: 1024px) {
  }
`;

const CancelButton = styled(DeleteButton)`
  background: #706d68;

  &: hover {
    background: #8a8371;
    transition: 0.3s;
  }
`;

export default Dashboard;
