import React, { useState } from "react";
import Purchase from "./Purchase";
import CheckoutForm from "./CheckoutForm";
import styled from "styled-components";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_jOgo4md45t5TTraVaobJ6Lg400J8bGMDJx");

const Checkout = ({ purchaseItemsTotal }) => {
  const [customer, setCustomer] = useState({});
  const [customerFormStatus, setCustomerFormStatus] = useState(false);
  const onSubmit = (data) => {
    setCustomer(data);
    setCustomerFormStatus(true);
  };
  return (
    <div>
      {console.log("CUSTOMER: ", customer)}
      {console.log("PURCHASE ITEMS TOTAL CHEEEECKOUT! ", purchaseItemsTotal)}

      <CheckoutForm
        onSubmit={onSubmit}
        status={customerFormStatus}
        amount={purchaseItemsTotal.cost}
      />
      {customerFormStatus && (
        <Elements stripe={stripePromise}>
          <Purchase amount={purchaseItemsTotal.cost} />
        </Elements>
      )}
    </div>
  );
};

export default Checkout;

const Input = styled.input`
  white-space: pre-line;
`;
