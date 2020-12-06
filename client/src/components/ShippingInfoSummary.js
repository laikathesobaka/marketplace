import React from "react";
import styled from "styled-components";

const ShippingInfoSummary = ({ fullName, address }) => {
  return (
    <Container>
      <Title>Shipping</Title>
      <Summary>
        <div>{fullName}</div>
        <div>{address}</div>
      </Summary>
    </Container>
  );
};

export default ShippingInfoSummary;

const Container = styled.div`
  padding-bottom: 40px;
`;
const Title = styled.div`
  font-weight: bold;
`;

const Summary = styled.div`
  font-size: 12px;
`;
