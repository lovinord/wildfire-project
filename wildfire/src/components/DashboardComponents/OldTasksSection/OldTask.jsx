import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { faFire } from "@fortawesome/free-solid-svg-icons";

const OldTask = ({ _id, userId, taskName, deadline, status }) => {

  const checkmarkIcon = <FontAwesomeIcon icon={faCheck} />;
  const fireIcon = <FontAwesomeIcon icon={faFire} />;

  return (
    <TaskWrapper>
      <>
        {status === "completed" ? (
          <span>{checkmarkIcon}</span>
        ) : (
          <span>{fireIcon}</span>
        )}
      </>

      <TextDate>
        <TaskName>{taskName}</TaskName>
        <Date>{deadline}</Date>
      </TextDate>
    </TaskWrapper>
  );
};

const TaskWrapper = styled.div`
  display: flex;
  padding: 3px;
  position: relative;
`;

const TextDate = styled.div`
  width: 85%;
  display: flex;
  flex-direction: column;
  margin-left: 5px;

  @media (min-width: 768px) {
  }

  @media (min-width: 1024px) {
  }
`;

const TaskName = styled.p`
  text-overflow: ellipsis;
  font-size: 0.9rem;
  text-decoration: line-through;

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
  margin-top: 3px;

  @media (min-width: 768px) {
    font-size: 0.8rem;
    margin-top: 4px;
  }

  @media (min-width: 1024px) {
    font-size: 0.9rem;
    margin-top: 5px;
  }
`;

export default OldTask;
