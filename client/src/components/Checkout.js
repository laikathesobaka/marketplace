import React, { useState, useEffect } from "react";
import Purchase from "./Purchase";
import CheckoutForm from "./CheckoutForm";
import styled from "styled-components";

import { connect } from "react-redux";
import { getCartProducts, aggregateCartTotals } from "../reducers/cart";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_jOgo4md45t5TTraVaobJ6Lg400J8bGMDJx");

const Checkout = ({ cart, cartTotals }) => {
  const [customer, setCustomer] = useState({});
  const [customerFormStatus, setCustomerFormStatus] = useState(false);
  // const [monthlyProducts, setMonthlyProducts] = useState([]);
  // const [oneTimeProducts, setOneTimeProducts] = useState([]);
  useEffect(() => {
    // separateProductsByType();
  });
  // const separateProductsByType = () => {
  //   const monthly = [];
  //   const oneTime = [];
  //   Object.keys(cart).forEach((product) => {
  //     if (product.type === "monthly") {
  //       monthly.push(monthly);
  //     } else {
  //       oneTime.push(oneTime);
  //     }
  //   });
  //   setMonthlyProducts([...monthly]);
  //   setOneTimeProducts([...oneTime]);
  // };
  const onSubmit = (data) => {
    // separateProduc;
    setCustomer(data);
    setCustomerFormStatus(true);
  };

  // Collect user information
  // Back end inserts user information
  // Check if any of the purchases are monthly
  // If yes, set aside info about monthly purchase products
  // Create payment intent
  return (
    <div>
      <CheckoutForm
        onSubmit={onSubmit}
        status={customerFormStatus}
        amount={cartTotals.cost}
      />
      {customerFormStatus && (
        <Elements stripe={stripePromise}>
          <Purchase
            // amount={cartTotals.cost}
            customer={customer}
            // monthlyProducts={monthlyProducts}
            // oneTime={oneTimeProducts}
            cartTotals={cartTotals}
          />
        </Elements>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: getCartProducts(state),
  cartTotals: aggregateCartTotals(state),
});

export default connect(mapStateToProps, null)(Checkout);
