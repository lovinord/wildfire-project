import { useContext, useEffect } from "react";
import styled from "styled-components";
import OldTask from "./OldTask";
import { UserContext } from "../../../contexts/UserContext";
import { TaskContext } from "../../../contexts/TaskContext";
import React from "react";

const OldTasks = () => {
  const { loggedInUser } = useContext(UserContext);
  const { getOldUserTasks, userOldTasks } = useContext(TaskContext);

  const userId = loggedInUser?.id;

  useEffect(() => {
    if (loggedInUser) {
      getOldUserTasks(userId);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <OldTasksWrapper>
      <Header>Old tasks</Header>
      <HorizontalLine />
      <TaskWrapper>
        {userOldTasks?.length ? (
          <TaskWrapper>
            {userOldTasks.map((task, i) => (
              <OldTask key={i} {...task} />
            ))}
          </TaskWrapper>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <>You don't have old tasks yet.</>
          </div>
        )}
      </TaskWrapper>
      <HorizontalLine />
    </OldTasksWrapper>
  );
};

const OldTasksWrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1.5rem;

  @media (min-width: 768px) {
    width: 70%;
  }

  @media (min-width: 1024px) {
    width: 80%;
  }
`;

const Header = styled.h2`
  font-weight: normal;
  font-size: 1.1rem;

  @media (min-width: 768px) {
    font-size: 1.4rem;
  }

  @media (min-width: 1024px) {
  }
`;

const HorizontalLine = styled.hr`
  width: 100%;
  height: 4px !important;
  background: black;
  border: none;
  border-radius: 3px;
  margin: 7px;
`;

const TaskWrapper = styled.div`
  overflow-y: scroll;
  width: 99%;
  max-height: 250px;

  ::-webkit-scrollbar {
    width: 12px;
    background: inherit;
  }

  ::-webkit-scrollbar-thumb {
    height: 15px;
    border-radius: 3px;
    background-color: black;
  }

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }
`;

export default OldTasks;
