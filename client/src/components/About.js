import React from "react";
import styled from "styled-components";
import { formatPrice } from "../helpers/formatPrice";

const About = ({ unitCost, description }) => {
  return (
    <AboutContainer>
      {console.log("description ?S??S?S", description)}
      <Description>
        <div>{description}</div>
      </Description>
      <Cost>${formatPrice(unitCost)}/lb</Cost>
    </AboutContainer>
  );
};

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

export default About;
