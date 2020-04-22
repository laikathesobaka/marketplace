import React from "react";
import styled from "styled-components";

const ShippingInfoSummary = ({ fullName, address }) => {
  return (
    <div>
      <Title>Shipping</Title>
      <Summary>
        <div>{fullName}</div>
        <div>{address}</div>
      </Summary>
    </div>
  );
};

export default ShippingInfoSummary;

const Title = styled.div`
  font-weight: bold;
`;

const Summary = styled.div`
  font-size: 12px;
`;
