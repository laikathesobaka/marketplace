import React from "react";
import styled from "styled-components";

export default function About() {
  return (
    <div>
      <div>Sourced from the best Siberian farmer's market.</div>
      <div>Number one cure for colds.</div>
      <Cost>$10.00 per bulb</Cost>
    </div>
  );
}

const AboutWrapper = styled.div`
  padding: 25px;
`;

const Cost = styled.div`
  padding-top: 10px;
`;
