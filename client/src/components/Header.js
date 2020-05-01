import React from "react";
import styled from "styled-components";

export default function Header() {
  return <Title>SIBERIAN FARMER'S MARKET</Title>;
}

const Title = styled.div`
  position: relative;
  width: -webkit-fill-available;
  font-size: 30px;
  text-align: center;
  color: black;
  font-weight: 900;
  margin-bottom: 60px;
  margin-top: 40px;
`;
