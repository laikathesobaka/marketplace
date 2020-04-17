import React from "react";
import { CardElement } from "@stripe/react-stripe-js";
// import './CardSectionStyles.css'
import styled from "styled-components";
const options = {
  style: {
    base: {
      color: "#32325d",
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: "antialiased",
      "::placeholder": {
        color: "#aab7c4",
      },
    },
    invalid: {
      color: "#fa755a",
      iconColor: "#fa755a",
    },
  },
};
export default function CardSection() {
  return (
    <Container>
      <SubTitle>Enter your card information</SubTitle>
      <CardContainer>
        <CardElement options={options} />
      </CardContainer>
      <Note>Your billing address is not required to make a purchase.</Note>
    </Container>
  );
}

const Container = styled.div`
  margin-bottom: 20px;
`;
const CardContainer = styled.div`
  margin-top: 10px;
  margin-bottom: 10px;
  border-style: solid;
  border-width: 0.01em;
  padding: 10px;
`;

const SubTitle = styled.div`
  font-size: 15px;
`;
const Note = styled.div`
  font-size: 12px;
`;
