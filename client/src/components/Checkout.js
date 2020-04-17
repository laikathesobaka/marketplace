import React, { useState, useEffect } from "react";
import Purchase from "./Purchase";
import CheckoutForm from "./CheckoutForm";
import OrderSummarySidebar from "./OrderSummarySidebar";
import ShippingInfoSummary from "./ShippingInfoSummary";
import styled from "styled-components";

import { connect } from "react-redux";
import { getCartProducts, aggregateCartTotals } from "../reducers/cart";
import { getUser } from "../reducers/user";
import { getProducts } from "../reducers/products";
import { navigate } from "@reach/router";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_jOgo4md45t5TTraVaobJ6Lg400J8bGMDJx");

const Checkout = ({ cart, cartTotals, products, user }) => {
  const [customerFormInput, setCustomerFormInput] = useState({});
  const [customerFormStatus, setCustomerFormStatus] = useState(false);
  const onCustomerFormSubmit = (data) => {
    setCustomerFormInput(data);
    setCustomerFormStatus(true);
  };

  const address = `${customerFormInput.address}, ${customerFormInput.city}, ${customerFormInput.state} ${customerFormInput.zipcode}`;
  const fullName = `${customerFormInput.firstName} ${customerFormInput.lastName}`;

  return (
    <div>
      <OrderSummarySidebar
        cart={cart}
        cartTotals={cartTotals}
        products={products}
      />
      <CheckoutContainer>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <MainTitle>Checkout</MainTitle>
          {!customerFormStatus && (
            <CheckoutForm
              onSubmit={onCustomerFormSubmit}
              customerFormStatus={customerFormStatus}
              amount={cartTotals.cost}
              user={user}
            />
          )}
        </div>

        {/* <div style={{ display: "flex", flexDirection: "column" }}> */}

        {customerFormStatus && (
          <div>
            <ShippingInfoSummary fullName={fullName} address={address} />
            <Elements stripe={stripePromise}>
              <Purchase
                customerFormInput={customerFormInput}
                cartTotals={cartTotals}
                cart={cart}
                products={products}
                user={user}
                fullName={fullName}
                address={address}
              />
            </Elements>
          </div>
        )}
      </CheckoutContainer>
    </div>
  );
};

const CheckoutContainer = styled.div`
  padding-top: 60px;
  padding-left: 30px;
  display: flex;
  flex-direction: column;
`;

const MainTitle = styled.div`
  padding-bottom: 30px;
  font-size: 40px;
`;

const SubTitle = styled.div``;

const mapStateToProps = (state) => ({
  cart: getCartProducts(state),
  cartTotals: aggregateCartTotals(state),
  user: getUser(state),
  products: getProducts(state),
});

export default connect(mapStateToProps, null)(Checkout);
