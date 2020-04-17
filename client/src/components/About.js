import React from "react";
import styled from "styled-components";

export default function About() {
  return (
    <AboutContainer>
      <Description>
        <div>Sourced from the best Siberian farmer's market.</div>
        <div>Number one cure for colds.</div>
      </Description>
      <Cost>$10.00 per bulb</Cost>
    </AboutContainer>
  );
}

const AboutContainer = styled.div``;

const Cost = styled.div`
  padding-top: 10px;
  font-size: 13px;
  font-weight: 100;
`;

const Description = styled.div`
  font-size: 14px;
  margin-top: 10px;
`;
