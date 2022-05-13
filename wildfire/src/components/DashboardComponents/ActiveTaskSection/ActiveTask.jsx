import React, { useState } from "react";
import styled from "styled-components";
import { useContext } from "react";
import { TaskContext } from "../../../contexts/TaskContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Button } from "../../../styles/styleAssets";

const ActiveTask = ({ _id, userId, taskName, deadline }) => {
  const { deleteTask, getActiveUserTasks, updateATask, getOldUserTasks } =
    useContext(TaskContext);

  const [showDeleteTask, setShowDeleteTask] = useState(false);
  const [showMarkAsCompleted, setShowMarkAsCompleted] = useState(false);

  const markAsCompletedClick = async (e) => {
    e.preventDefault();
    if (_id && userId) {
      const task = {
        _id,
        userId,
      };
      let result = await updateATask(task);
      if (result.success) {
        return;
      }
    }
    setShowMarkAsCompleted(false);
    getActiveUserTasks(userId);
    getOldUserTasks(userId);
  };

  const deleteTaskClick = async (e) => {
    e.preventDefault();
    if (_id && userId) {
      const task = {
        _id,
        userId,
      };
      let result = await deleteTask(task);
      if (result.success) {
        return;
      }
    }
    setShowDeleteTask(false);
    getActiveUserTasks(userId);
  };

  const deleteTaskIcon = <FontAwesomeIcon icon={faTrashCan} />;
  const checkmarkIcon = <FontAwesomeIcon icon={faCheck} />;

  const renderState = showDeleteTask || showMarkAsCompleted;

  return (
    <TaskWrapper showDeleteTaskModal={renderState}>
      {!renderState ? (
        <TaskRow>
          <CheckOrDelete>
            <CheckboxContainer onClick={() => setShowMarkAsCompleted(true)}>
              {checkmarkIcon}
            </CheckboxContainer>
            <DeleteActiveTask onClick={() => setShowDeleteTask(true)}>
              <>{deleteTaskIcon}</>
            </DeleteActiveTask>
          </CheckOrDelete>
          <TextDate>
            <TaskName>{taskName}</TaskName>
            <Date>{deadline}</Date>
          </TextDate>
        </TaskRow>
      ) : (
        <TaskRow>
          {showDeleteTask ? (
            <DeleteConfirmation>
              <TaskName>Delete {taskName} ?</TaskName>
              <ButtonWrapper>
                <CancelButton onClick={() => setShowDeleteTask(false)}>
                  Cancel
                </CancelButton>
                <DeleteButton onClick={deleteTaskClick}>Delete</DeleteButton>
              </ButtonWrapper>
            </DeleteConfirmation>
          ) : (
            <CompleteConfirmation>
              <TaskName>Mark {taskName} as completed?</TaskName>
              <ButtonWrapper>
                <CancelButton onClick={() => setShowMarkAsCompleted(false)}>
                  Cancel
                </CancelButton>
                <CompleteButton onClick={markAsCompletedClick}>
                  Complete
                </CompleteButton>
              </ButtonWrapper>
            </CompleteConfirmation>
          )}
        </TaskRow>
      )}
    </TaskWrapper>
  );
};

const TaskWrapper = styled.div``;

const TaskRow = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0px 7px;

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }
`;

const DeleteConfirmation = styled.div`
  background: rgb(229 153 0);
  width: 100%;
  height: 70px;
  border-radius: 3px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  padding: 8px;

  @media (min-width: 768px) {
    padding: 4px;
  }

  @media (min-width: 1024px) {
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  gap: 13px;

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

const CompleteConfirmation = styled(DeleteConfirmation)``;

const CompleteButton = styled(DeleteButton)`
  width: 75px;

  @media (min-width: 768px) {
    width: 90px;
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

const CheckOrDelete = styled.div`
  width: 95px;
  display: flex;
`;

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  width: 25px !important;
  height: 25px !important;
  margin: 4px 4px 4px 1px;
  -webkit-appearance: none;
  -moz-appearance: none;
  -o-appearance: none;
  appearance: none;
  outline: none;
  background: white;
  border-radius: 4px;
  box-shadow: none;
  font-size: 2em;
  position: relative;

  > svg {
    display: none;
    font-size: 1.5rem;
  }

  &: hover {
    box-shadow: rgb(229 153 0) 1px 1px 3px 0.5px inset;
    transition: 0.2s;

    > svg {
      display: initial;
      transition: 0.3s;
    }
  }

  @media (min-width: 768px) {
    width: 28px !important;
    height: 28px !important;
    margin-right: 15px;
  }

  @media (min-width: 1024px) {
    width: 26px !important;
    height: 26px !important;
    margin-right: 15px;
  }
`;

const TextDate = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }
`;

const TaskName = styled.p`
  text-overflow: ellipsis;
  font-size: 0.9rem;

  @media (min-width: 768px) {
    font-size: 1rem;
  }

  @media (min-width: 1024px) {
    font-size: 1.1rem;
  }

  &: hover {
    overflow: visible;
    white-space: normal;
    height: auto;
  }
`;

const Date = styled.p`
  font-size: 0.7rem;
  margin-top: 1px;

  @media (min-width: 768px) {
    font-size: 0.8rem;
    margin-top: 2px;
  }

  @media (min-width: 1024px) {
    font-size: 0.9rem;
  }
`;

const DeleteActiveTask = styled.div`
  position: relative;
  font-size: 1.2rem;
  cursor: pointer;
  margin: 1px;
  padding: 1px;

  &: hover {
    color: #c70404;
    transition: 0.3s;
  }

  @media (min-width: 768px) {
    font-size: 1.6rem;
  }

  @media (min-width: 1024px) {
  }
`;

export default ActiveTask;
