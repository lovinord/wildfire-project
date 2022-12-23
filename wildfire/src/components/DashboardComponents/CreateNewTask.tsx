import { useContext, useState } from "react";
import styled from "styled-components";
import { Button, CloseButton, InputText } from "../../styles/styleAssets";
import { DashboardContext } from "../../contexts/DashboardContext";
import { UserContext } from "../../contexts/UserContext";
import { TaskContext } from "../../contexts/TaskContext";
import React from "react";

const CreateNewTask = () => {
  const { openModal, toggleNewTaskModal } = useContext(DashboardContext);
  const { loggedInUser } = useContext(UserContext);
  const { createNewTask, getActiveUserTasks } = useContext(TaskContext);

  const [taskName, setTaskName] = useState("");
  const [deadline, setDeadline] = useState("");

  const userId = loggedInUser?.id;

  const addNewTask = async (e) => {
    e.preventDefault();
    if (taskName && deadline && userId) {
      const createTask = {
        userId,
        taskName,
        deadline,
      };
      let result = await createNewTask(createTask);
      if (result.success) {
        return;
      }
    }
    getActiveUserTasks(userId);
    setTaskName("");
    setDeadline("");
    toggleNewTaskModal();
  };

  return (
    <>
      {openModal && (
        <>
          <OverLay>
            <Modal>
              <CloseModalButton onClick={toggleNewTaskModal}>
                &#10006;
              </CloseModalButton>
              <TaskWrapper>
                <TaskInputWrapper>
                  <TaskInput
                    type="text"
                    id="task"
                    value={taskName}
                    placeholder="What is your task?"
                    autoFocus
                    onChange={(e) => setTaskName(e.target.value)}
                  />
                  <SmallHeader>What is the deadline?</SmallHeader>
                  <TaskDate
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </TaskInputWrapper>
                <SmallHeader>Confirm task information</SmallHeader>
                <TaskConfirmation>
                  <TaskP>
                    {taskName ? (
                      <>{taskName}</>
                    ) : (
                      <>Choose a name for your task.</>
                    )}
                  </TaskP>
                  <TaskP>
                    {deadline ? (
                      <>{deadline}</>
                    ) : (
                      <>Choose a deadline for your task.</>
                    )}
                  </TaskP>
                </TaskConfirmation>
              </TaskWrapper>
              <CreateTaskButton
                onClick={addNewTask}
                disabled={!taskName || !deadline}
              >
                Create new task
              </CreateTaskButton>
            </Modal>
          </OverLay>
        </>
      )}
    </>
  );
};

const OverLay = styled.div`
  z-index: 3;
  position: fixed;
  transform: translate3d(0, 0, 0);
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Modal = styled.div`
  z-index: 4;
  background: #ffb218;
  border-radius: 8px;
  width: 85%;
  max-width: 400px;
  height: 430px;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  @media (min-width: 768px) {
    max-width: 400px;
  }

  @media (min-width: 1024px) {
    max-width: 500px;
  }
`;

const CloseModalButton = styled(CloseButton)`
  font-size: 1.5rem;
  position: absolute;
  right: 10px;
  top: 3px;
`;

const TaskWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TaskInputWrapper = styled.div`
  margin-top: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TaskInput = styled(InputText)`
  width: 90%;

  @media (min-width: 768px) {
    width: 350px;
  }

  @media (min-width: 1024px) {
    width: 400px;
  }
`;

const SmallHeader = styled.h2`
  font-size: 1rem;
  font-weight: normal;
  margin-top: 10px;
  margin-bottom: 3px;

  @media (min-width: 768px) {
    font-size: 1.1rem;
    margin-top: 13px;
    margin-bottom: 4px;
  }

  @media (min-width: 1024px) {
    font-size: 1.2rem;
  }
`;

const TaskDate = styled.input`
  width: 90%;
  color: #333;
  font-size: 0.8rem;
  border: none;
  border-radius: 4px;
  padding: 0.2rem;

  @media (min-width: 768px) {
    width: 350px;
    height: 35px;
    font-size: 1rem;
  }

  @media (min-width: 1024px) {
    width: 400px;
  }
`;

const TaskConfirmation = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 90%;
  height: 65px;
  box-shadow: rgb(229 153 0) 1px 2px 3px 1px inset;
  padding: 5px;
  border-radius: 5px;

  @media (min-width: 768px) {
    width: 350px;
    padding: 10px;
  }

  @media (min-width: 1024px) {
    width: 400px;
  }
`;

const TaskP = styled.p`
  font-size: 0.73rem;
  font-weight: slimmer;
  text-align: justify;
  word-break: break-word;
  white-space: pre-line;
  overflow-wrap: break-word;
  -ms-word-break: break-word;
  word-break: break-word;
  -ms-hyphens: auto;
  -moz-hyphens: auto;
  -webkit-hyphens: auto;
  hyphens: auto;

  @media (min-width: 768px) {
    font-size: 0.9rem;
  }

  @media (min-width: 1024px) {
    font-size: 1rem;
  }

  &: hover {
    overflow: visible;
    white-space: normal;
    height: auto;
  }
`;

const CreateTaskButton = styled(Button)`
  width: 170px;
  height: 45px;
  margin: auto;
  opacity: ${(props) => (props.disabled === true ? 0.75 : 1)};
  cursor: ${(props) => (props.disabled === true ? "auto" : "pointer")};
  @media (min-width: 768px) {
    width: 190px;
    height: 50px;
  }

  @media (min-width: 1024px) {
    width: 200px;
  }
`;

export default CreateNewTask;
