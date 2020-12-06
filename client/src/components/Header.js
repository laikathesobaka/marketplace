import React from "react";
import styled from "styled-components";

const Header = ({ title }) => {
  return (
    <Container>
      <Title>{title}</Title>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  margin-top: 100px;
`;

const Title = styled.div`
  font-family: "Rubik", sans-serif;
  font-size: 30px;
  text-align: center;
  color: black;
  font-weight: 900;
  margin-bottom: 60px;
  margin-top: 100px;
`;
