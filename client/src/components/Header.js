import React from "react";
import styled from "styled-components";

export default function Header() {
  return <Title>SIBERIAN FARMER'S MARKET</Title>;
}

const Title = styled.div`
  width: -webkit-fill-available;
  position: fixed;
  top: 45px;
  font-size: 30px;
  text-align: center;
  color: black;
  font-weight: 900;
`;
