import React from "react";
import styled from "styled-components";
import { css } from "@emotion/core";
import FadeLoader from "react-spinners/FadeLoader";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

const Loader = ({ active }) => {
  if (active) {
    return (
      <Container>
        <div>
          <FadeLoader
            css={override}
            size={150}
            color={"#123abc"}
            loading={active}
          />
        </div>
      </Container>
    );
  } else {
    return <div></div>;
  }
};

export default Loader;

const Container = styled.div`
  position: fixed;
  background-color: white;
  opacity: 0.6;
  z-index: 6;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  margin-left: -50vw;
  left: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
