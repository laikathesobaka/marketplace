import React from "react";
import styled from "styled-components";

const CounterSidebar = ({ active }) => {
  if (active) {
    return <Container />;
  } else {
    return <div></div>;
  }
};

export default CounterSidebar;

const Container = styled.div`
  position: fixed;
  background-color: white;
  opacity: 0.6;
  z-index: 3;
  height: 100vh;
  width: 100vw;
  left: 0;
  top: 0;
  margin-left: -50vw;
  left: 50%;
`;
