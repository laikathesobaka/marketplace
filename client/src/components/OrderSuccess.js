import React from "react";
import styled from "styled-components";
import ShippingInfoSummary from "./ShippingInfoSummary";
import OrderSummary from "./OrderSummary";
const OrderSuccess = (props) => {
  console.log("ORDER SUCCESS PROPS ", props.location.state);
  const data = props.location.state;
  return (
    <Container>
      <Title>Order placed!</Title>
      <Note>
        We have received your order and it is being processed. <br />
        You will get an email confirmation at {data.email}.
      </Note>
      <ContinueShoppingButton>Continue Shopping</ContinueShoppingButton>
      <ShippingInfoContainer>
        <ShippingInfoSummary fullName={data.fullName} address={data.address} />
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
  font-size: 30px;
  font-weight: bold;
`;

const Note = styled.div`
  font-size: 11px;
  text-align: center;
  margin-top: 7px;
`;

const ShippingInfoContainer = styled.div`
  font-size: 11px;
  width: 300px;
`;

const ContinueShoppingButton = styled.button`
  padding: 10px;
  margin-top: 20px;
  background-color: white;
  background-blend-mode: color;
  width: 300px;
  border-radius: 2px;
  font-weight: bold;
`;
