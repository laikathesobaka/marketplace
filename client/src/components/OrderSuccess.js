import React from "react";
import styled from "styled-components";
import ShippingInfoSummary from "./ShippingInfoSummary";
import { Link } from "@reach/router";

const OrderSuccess = ({ location }) => {
  const { address, email, fullName } = location.state;
  return (
    <Container>
      <Title>Order placed!</Title>
      <Note>
        We have received your order and it is being processed. <br />
        You will get an email confirmation at {email}.
      </Note>
      <Link to="/">
        <ContinueShoppingButton>Continue Shopping</ContinueShoppingButton>
      </Link>
      <ShippingInfoContainer>
        <ShippingInfoSummary fullName={fullName} address={address} />
      </ShippingInfoContainer>
    </Container>
  );
};

export default OrderSuccess;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: -webkit-fill-available;
`;

const Title = styled.div`
  font-family: "Rubik", sans-serif;
  font-weight: 100;
  font-size: 35px;
`;

const Note = styled.div`
  font-size: 11px;
  text-align: center;
  margin-top: 7px;
`;

const ShippingInfoContainer = styled.div`
  font-size: 11px;
  width: 300px;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ContinueShoppingButton = styled.button`
  padding: 10px;
  margin-top: 20px;
  background-color: white;
  background-blend-mode: color;
  width: 300px;
  border-radius: 2px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: white;
    background-color: black;
  }
`;
