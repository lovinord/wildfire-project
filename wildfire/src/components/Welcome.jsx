import React from "react";
import styled from "styled-components";
import { MenuHeader } from "../styles/styleAssets";
import { ReactComponent as TreeOneSvg } from "../assets/images/Trees/One/tree-one.svg";
import { ReactComponent as TreeTwoSvg } from "../assets/images/Trees/Two/tree-two.svg";
import { ReactComponent as TreeThreeSvg } from "../assets/images/Trees/Three/tree-three.svg";
import { ReactComponent as TreeFourSvg } from "../assets/images/Trees/Four/tree-four.svg";
import { ReactComponent as TreeFiveSvg } from "../assets/images/Trees/Five/tree-five.svg";

const Welcome = () => {
  return (
    <Container>
      <Sky>
        <Header>Welcome to Wildfire</Header>
      </Sky>
      <RowWrapper>
        <RowOne>
          <TreeWrapperOne>
            <TreeOneSvg />
            <TreeTwoSvg />
            <TreeThreeSvg />
            <TreeFourSvg />
            <TreeFiveSvg />
          </TreeWrapperOne>
          <RowOneGround />
        </RowOne>
        <RowTwo>
          <TreeWrapperTwo>
            <TreeThreeSvg />
            <TreeOneSvg />
            <TreeTwoSvg />
            <TreeFiveSvg />
            <TreeFourSvg />
          </TreeWrapperTwo>
          <RowTwoGround />
        </RowTwo>
        <RowThree>
          <TreeWrapperThree>
            <TreeThreeSvg />
            <TreeTwoSvg />
            <TreeFourSvg />
            <TreeFiveSvg />
            <TreeOneSvg />
          </TreeWrapperThree>
          <RowThreeGround />
        </RowThree>
      </RowWrapper>
    </Container>
  );
};
export default Welcome;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffa11b;
  height: 100%;
  width: 100%;
`;

const Sky = styled.div`
  z-index: 0;
`;

const Header = styled(MenuHeader)`
  margin-left: 30px;
  font-size: 1.8rem;

  @media (min-width: 768px) {
    margin-left: 50px;
    font-size: 3rem;
  }

  @media (min-width: 1024px) {
    margin-left: 70px;
    font-size: 3.5rem;
  }
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
  background: #e27710;
  height: 700px;
`;

const RowTwoGround = styled(RowOneGround)`
  background: #9e3b1b;
  height: 600px;
`;

const RowThreeGround = styled(RowOneGround)`
  background: #5e1816;
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
      fill: #e27710;
      > * {
        fill: #e27710;
        > * {
          fill: #e27710;
          > * {
            fill: #e27710;
            > * {
              fill: #e27710;
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
      fill: #9e3b1b;
      > * {
        fill: #9e3b1b;
        > * {
          fill: #9e3b1b;
          > * {
            fill: #9e3b1b;
            > * {
              fill: #9e3b1b;
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
      fill: #5e1816;
      > * {
        fill: #5e1816;
        > * {
          fill: #5e1816;
          > * {
            fill: #5e1816;
            > * {
              fill: #5e1816;
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
