import { useContext, useEffect } from "react";
import styled from "styled-components";
import ActiveTask from "./ActiveTask";
import { UserContext } from "../../../contexts/UserContext";
import { TaskContext } from "../../../contexts/TaskContext";
import { TreeContext } from "../../../contexts/TreeContext";
import React from "react";

const ActiveTasks = () => {
  const { loggedInUser } = useContext(UserContext);
  const {
    getActiveUserTasks,
    userActiveTasks,
    markTaskAsMissed,
    getOldUserTasks,
  } = useContext(TaskContext);
  const { createDeadTree, deadTree, getDeadTreesByUser } =
    useContext(TreeContext);

  const userId = loggedInUser?.id;

  const killTree = async () => {
    if (userActiveTasks && userActiveTasks[0]?.deadline) {
      const userId = userActiveTasks[0]?.userId;
      const taskId = userActiveTasks[0]?._id;

      const deadline = new Date(userActiveTasks[0].deadline);
      const deadlineInSeconds = deadline.getTime();

      const allTree = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
      const allAliveTree = allTree.filter((el) => !deadTree.includes(el));
      const treeIndex =
        allAliveTree[Math.floor(Math.random() * allAliveTree.length)];

      if (deadlineInSeconds < Date.now()) {
        const tree = {
          userId,
          taskId,
          treeIndex,
        };

        let result = await createDeadTree(tree);
        if (result.success) {
          return;
        }
        markTaskAsMissed(userActiveTasks[0]);

        const timeoutID = window.setTimeout(() => {
          getActiveUserTasks(userId);
          getOldUserTasks(userId);
          getDeadTreesByUser(userId);
        }, 1000);

        return () => window.clearTimeout(timeoutID);
      }
    }
  };

  useEffect(() => {
    if (loggedInUser) {
      getActiveUserTasks(userId);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    killTree();
    // eslint-disable-next-line
  }, [userActiveTasks]);

  return (
    <ActiveTasksWrapper>
      <Header>Active tasks</Header>
      <HorizontalLine />
      {userActiveTasks?.length ? (
        <TaskWrapper>
          {userActiveTasks.map((task, i) => (
            <ActiveTask key={i} {...task} />
          ))}
        </TaskWrapper>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <>You don't have tasks yet.</>
        </div>
      )}

      <HorizontalLine />
    </ActiveTasksWrapper>
  );
};

const ActiveTasksWrapper = styled.div`
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

export default ActiveTasks;
