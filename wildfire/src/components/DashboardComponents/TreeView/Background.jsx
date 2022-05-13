import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as TreeOneSvg } from "../../../assets/images/Trees/One/tree-one.svg";
import { ReactComponent as DeadTreeOneSvg } from "../../../assets/images/Trees/One/tree-one-dead.svg";
import { ReactComponent as TreeTwoSvg } from "../../../assets/images/Trees/Two/tree-two.svg";
import { ReactComponent as DeadTreeTwoSvg } from "../../../assets/images/Trees/Two/tree-two-dead.svg";
import { ReactComponent as TreeThreeSvg } from "../../../assets/images/Trees/Three/tree-three.svg";
import { ReactComponent as DeadTreeThreeSvg } from "../../../assets/images/Trees/Three/tree-three-dead.svg";
import { ReactComponent as TreeFourSvg } from "../../../assets/images/Trees/Four/tree-four.svg";
import { ReactComponent as DeadTreeFourSvg } from "../../../assets/images/Trees/Four/tree-four-dead.svg";
import { ReactComponent as TreeFiveSvg } from "../../../assets/images/Trees/Five/tree-five.svg";
import { ReactComponent as DeadTreeFiveSvg } from "../../../assets/images/Trees/Five/tree-five-dead.svg";
import { TaskContext } from "../../../contexts/TaskContext";
import { UserContext } from "../../../contexts/UserContext";
import { TreeContext } from "../../../contexts/TreeContext";

const Horizon = () => {
  const { getActiveUserTasks, userActiveTasks } = useContext(TaskContext);
  const { loggedInUser } = useContext(UserContext);
  const { deadTree } = useContext(TreeContext);

  const deadline = new Date(userActiveTasks?.[0]?.deadline);
  const deadlineInSeconds = deadline?.getTime();
  const daysLeftSum = deadlineInSeconds - Date.now();

  const lessThanOneDayLeft = daysLeftSum < 86400000;
  const lessThanThreeDaysLeft = daysLeftSum < 86400000 * 3;

  const getTreeComponent = (aliveSVG, deadSVG) => {
    return (index, deadTree) => {
      const isAlive = !deadTree.includes(index);
      return isAlive ? aliveSVG : deadSVG;
    };
  };

  useEffect(() => {
    if (loggedInUser) {
      getActiveUserTasks(loggedInUser.id);
    }
    // eslint-disable-next-line
  }, []);
  const One = getTreeComponent(TreeOneSvg, DeadTreeOneSvg);
  const Two = getTreeComponent(TreeTwoSvg, DeadTreeTwoSvg);
  const Three = getTreeComponent(TreeThreeSvg, DeadTreeThreeSvg);
  const Four = getTreeComponent(TreeFourSvg, DeadTreeFourSvg);
  const Five = getTreeComponent(TreeFiveSvg, DeadTreeFiveSvg);
  const rowOne = [One, Two, Three, Four, Five];
  const rowTwo = [Two, One, Three, Five, Four];
  const rowThree = [Five, Four, Two, One, Three];

  return (
    <Container
      lessThanThreeDaysLeft={lessThanThreeDaysLeft}
      lessThanOneDayLeft={lessThanOneDayLeft}
    >
      <Sky />
      <RowWrapper>
        <RowOne>
          <TreeWrapperOne
            lessThanThreeDaysLeft={lessThanThreeDaysLeft}
            lessThanOneDayLeft={lessThanOneDayLeft}
          >
            {rowOne.map((el, index) => {
              return React.createElement(el(index, deadTree));
            })}
          </TreeWrapperOne>
          <RowOneGround
            lessThanThreeDaysLeft={lessThanThreeDaysLeft}
            lessThanOneDayLeft={lessThanOneDayLeft}
          />
        </RowOne>
        <RowTwo>
          <TreeWrapperTwo
            lessThanThreeDaysLeft={lessThanThreeDaysLeft}
            lessThanOneDayLeft={lessThanOneDayLeft}
          >
            {rowTwo.map((el, index) => {
              return React.createElement(el(index + 5, deadTree));
            })}
          </TreeWrapperTwo>
          <RowTwoGround
            lessThanThreeDaysLeft={lessThanThreeDaysLeft}
            lessThanOneDayLeft={lessThanOneDayLeft}
          />
        </RowTwo>
        <RowThree>
          <TreeWrapperThree
            lessThanThreeDaysLeft={lessThanThreeDaysLeft}
            lessThanOneDayLeft={lessThanOneDayLeft}
          >
            {rowThree.map((el, index) => {
              return React.createElement(el(index + 10, deadTree));
            })}
          </TreeWrapperThree>
          <RowThreeGround
            lessThanThreeDaysLeft={lessThanThreeDaysLeft}
            lessThanOneDayLeft={lessThanOneDayLeft}
          />
        </RowThree>
      </RowWrapper>
    </Container>
  );
};
export default Horizon;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: ${(props) =>
    props.lessThanThreeDaysLeft === true && props.lessThanOneDayLeft === false
      ? "#94C5C9 "
      : props.lessThanOneDayLeft === true
      ? "#FFA11B"
      : "#F7FFD8"};
  height: 100%;
  width: 100%;
`;

const Sky = styled.div`
  z-index: 0;
`;

const RowWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  position: relative;
  bottom: 1;
`;

const RowOne = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0px;
  z-index: 2;
  max-height: 650px;

  @media (min-width: 768px) {
    max-height: 750px;
  }

  @media (min-width: 1024px) {
    max-height: 720px;
  }
`;

const RowTwo = styled(RowOne)`
  position: absolute;
  bottom: 0px;
  z-index: 3;
  max-height: 650px;

  @media (min-width: 768px) {
    max-height: 750px;
  }

  @media (min-width: 1024px) {
    max-height: 720px;
  }
`;

const RowThree = styled(RowOne)`
  position: absolute;
  bottom: 0px;
  z-index: 4;
  gap: 0px;
  max-height: 650px;

  @media (min-width: 768px) {
    max-height: 750px;
  }

  @media (min-width: 1024px) {
    max-height: 720px;
  }
`;

const RowOneGround = styled.div`
  background: ${(props) =>
    props.lessThanThreeDaysLeft === true && props.lessThanOneDayLeft === false
      ? "#3D9298 "
      : props.lessThanOneDayLeft === true
      ? "#E27710"
      : "#96B984"};
  height: 700px;
`;

const RowTwoGround = styled(RowOneGround)`
  background: ${(props) =>
    props.lessThanThreeDaysLeft === true && props.lessThanOneDayLeft === false
      ? "#0A7374"
      : props.lessThanOneDayLeft === true
      ? "#9E3B1B"
      : "#589362"};
  height: 600px;
`;

const RowThreeGround = styled(RowOneGround)`
  background: ${(props) =>
    props.lessThanThreeDaysLeft === true && props.lessThanOneDayLeft === false
      ? "#083B3F"
      : props.lessThanOneDayLeft === true
      ? "#5E1816"
      : "#193326"};
  height: 400px;

  @media (min-width: 768px) {
    height: 300px;
  }

  @media (min-width: 1024px) {
  }
`;

const TreeWrapperOne = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-between;
  > svg {
    max-height: 130px;
    > * {
      fill: ${(props) =>
        props.lessThanThreeDaysLeft === true &&
        props.lessThanOneDayLeft === false
          ? "#3D9298"
          : props.lessThanOneDayLeft
          ? "#E27710"
          : "#96B984 "};
      > * {
        fill: ${(props) =>
          props.lessThanThreeDaysLeft === true &&
          props.lessThanOneDayLeft === false
            ? "#3D9298"
            : props.lessThanOneDayLeft
            ? "#E27710"
            : "#96B984"};
        > * {
          fill: ${(props) =>
            props.lessThanThreeDaysLeft === true &&
            props.lessThanOneDayLeft === false
              ? "#3D9298"
              : props.lessThanOneDayLeft
              ? "#E27710"
              : "#96B984"};
          > * {
            ${(props) =>
              props.lessThanThreeDaysLeft === true &&
              props.lessThanOneDayLeft === false
                ? "#3D9298"
                : props.lessThanOneDayLeft
                ? "#E27710"
                : "#96B984"};
            > * {
              fill: ${(props) =>
                props.lessThanThreeDaysLeft === true &&
                props.lessThanOneDayLeft === false
                  ? "#3D9298"
                  : props.lessThanOneDayLeft
                  ? "#E27710"
                  : "#96B984"};
            }
          }
        }
      }
    }

    @media (min-width: 768px) {
      max-height: 280px;
    }

    @media (min-width: 1024px) {
      max-height: 250px;
    }
  }
`;

const TreeWrapperTwo = styled(TreeWrapperOne)`
  > svg {
    max-height: 130px;
    > * {
      fill: ${(props) =>
        props.lessThanThreeDaysLeft === true &&
        props.lessThanOneDayLeft === false
          ? "#0A7374"
          : props.lessThanOneDayLeft
          ? "#9E3B1B"
          : "#589362"};
      > * {
        fill: ${(props) =>
          props.lessThanThreeDaysLeft === true &&
          props.lessThanOneDayLeft === false
            ? "#0A7374"
            : props.lessThanOneDayLeft
            ? "#9E3B1B"
            : "#589362"};
        > * {
          fill: ${(props) =>
            props.lessThanThreeDaysLeft === true &&
            props.lessThanOneDayLeft === false
              ? "#0A7374"
              : props.lessThanOneDayLeft
              ? "#9E3B1B"
              : "#589362"};
          > * {
            fill: ${(props) =>
              props.lessThanThreeDaysLeft === true &&
              props.lessThanOneDayLeft === false
                ? "#0A7374"
                : props.lessThanOneDayLeft === true
                ? "#9E3B1B"
                : "#589362"};
            > * {
              fill: ${(props) =>
                props.lessThanThreeDaysLeft === true &&
                props.lessThanOneDayLeft === false
                  ? "#0A7374"
                  : props.lessThanOneDayLeft === true
                  ? "#9E3B1B"
                  : "#589362"};
              > * {
                fill: ${(props) =>
                  props.lessThanThreeDaysLeft === true &&
                  props.lessThanOneDayLeft === false
                    ? "#0A7374"
                    : props.lessThanOneDayLeft === true
                    ? "#9E3B1B"
                    : "#589362"};
              }
            }
          }
        }
      }
    }

    @media (min-width: 768px) {
      max-height: 280px;
    }

    @media (min-width: 1024px) {
      max-height: 300px;
    }
  }
`;

const TreeWrapperThree = styled(TreeWrapperOne)`
  > svg {
    max-height: 130px;
    > * {
      fill: ${(props) =>
        props.lessThanThreeDaysLeft === true &&
        props.lessThanOneDayLeft === false
          ? "#083B3F"
          : props.lessThanOneDayLeft
          ? "#5E1816"
          : "#193326"};
      > * {
        fill: ${(props) =>
          props.lessThanThreeDaysLeft === true &&
          props.lessThanOneDayLeft === false
            ? "#083B3F"
            : props.lessThanOneDayLeft
            ? "#5E1816"
            : "#193326"};
        > * {
          fill: ${(props) =>
            props.lessThanThreeDaysLeft === true &&
            props.lessThanOneDayLeft === false
              ? "#083B3F"
              : props.lessThanOneDayLeft
              ? "#5E1816"
              : "#193326"};
          > * {
            fill: ${(props) =>
              props.lessThanThreeDaysLeft === true &&
              props.lessThanOneDayLeft === false
                ? "#083B3F"
                : props.lessThanOneDayLeft === true
                ? "#5E1816"
                : "#193326"};
            > * {
              fill: ${(props) =>
                props.lessThanThreeDaysLeft === true &&
                props.lessThanOneDayLeft === false
                  ? "#083B3F"
                  : props.lessThanOneDayLeft === true
                  ? "#5E1816"
                  : "#193326"};
              > * {
                fill: ${(props) =>
                  props.lessThanThreeDaysLeft === true &&
                  props.lessThanOneDayLeft === false
                    ? "#083B3F"
                    : props.lessThanOneDayLeft === true
                    ? "#5E1816"
                    : "#193326"};
                > * {
                  fill: ${(props) =>
                    props.lessThanThreeDaysLeft === true &&
                    props.lessThanOneDayLeft === false
                      ? "#083B3F"
                      : props.lessThanOneDayLeft === true
                      ? "#5E1816"
                      : "#193326"};
                }
              }
            }
          }
        }
      }
    }

    @media (min-width: 768px) {
      max-height: 280px;
    }

    @media (min-width: 1024px) {
      max-height: 350px;
    }
  }
`;

/* const TreeOne = styled(TreeOneSvg)`
  width: 100px;
  height: 100px;
  > g {
    fill: red;
  }
`;

const TreeTwo = styled(TreeTwoSvg)`
  width: 200px;
  height: 100px;
  > g {
    fill: red;
  }
`;

const TreeThree = styled(TreeThreeSvg)`
  width: 100px;
  height: 100px;
  > g {
    fill: red;
  }
`;

const TreeFour = styled(TreeFourSvg)`
  width: 100px;
  height: 100px;
  > g {
    fill: red;
  }
`;

const TreeFive = styled(TreeFiveSvg)`
  width: 100px;
  height: 100px;
  > g {
    fill: red;
  }
`; */
