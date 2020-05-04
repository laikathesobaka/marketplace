import React, { useState, useEffect } from "react";
import Purchase from "./Purchase";
import CheckoutForm from "./CheckoutForm";
import OrderSummarySidebar from "./OrderSummarySidebar";
import ShippingInfoSummary from "./ShippingInfoSummary";
import SignIn from "./SignIn";
import styled from "styled-components";

import { connect } from "react-redux";
import { getCartProducts, aggregateCartTotals } from "../reducers/cart";
import {
  receiveUser,
  updateUserAuth,
  checkUserAuthenticated,
} from "../actions";
import { getUser, getUserAuthStatus } from "../reducers/user";
import { getProducts } from "../reducers/products";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe("pk_test_jOgo4md45t5TTraVaobJ6Lg400J8bGMDJx");

const Checkout = ({
  cart,
  cartTotals,
  products,
  user,
  userAuthStatus,
  updateUserAuth,
  receiveUser,
  checkUserAuthenticated,
}) => {
  const [customerFormInput, setCustomerFormInput] = useState({});
  const [customerFormStatus, setCustomerFormStatus] = useState(false);
  const [checkoutOption, setCheckoutOption] = useState("");
  const [guestCheckoutClicked, setGuestCheckoutClicked] = useState(false);
  useEffect(() => {
    checkUserAuthenticated();
  }, [userAuthStatus]);

  const onCustomerFormSubmit = (data) => {
    setCustomerFormInput(data);
    setCustomerFormStatus(true);
  };

  const address = `${customerFormInput.address}, ${customerFormInput.city}, ${customerFormInput.state} ${customerFormInput.zipcode}`;
  const fullName = `${customerFormInput.firstName} ${customerFormInput.lastName}`;

  return (
    <div style={{ display: "flex" }}>
      <div>
        <OrderSummarySidebar
          cart={cart}
          cartTotals={cartTotals}
          products={products}
        />
      </div>
      <div>
        <CheckoutContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <MainTitle>Checkout</MainTitle>
            {!userAuthStatus && !guestCheckoutClicked && (
              <CheckoutOptions>
                <div>
                  <div>
                    Sign in for faster checkout
                    <SignIn
                      receiveUser={receiveUser}
                      updateUserAuth={updateUserAuth}
                    />
                  </div>
                </div>
                <div>
                  <div>Checkout as guest</div>
                  <GuestCheckoutButton
                    onClick={() => setGuestCheckoutClicked(true)}
                  >
                    Continue as guest
                  </GuestCheckoutButton>
                </div>
              </CheckoutOptions>
            )}
            <div>
              {(userAuthStatus || guestCheckoutClicked) &&
                !customerFormStatus && (
                  <CheckoutForm
                    onSubmit={onCustomerFormSubmit}
                    customerFormStatus={customerFormStatus}
                    amount={cartTotals.cost}
                    user={user}
                  />
                )}
            </div>

            {(userAuthStatus || guestCheckoutClicked) > 0 &&
              customerFormStatus && (
                <PaymentContainer>
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
                </PaymentContainer>
              )}
          </div>
        </CheckoutContainer>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: getCartProducts(state),
  cartTotals: aggregateCartTotals(state),
  user: getUser(state),
  userAuthStatus: getUserAuthStatus(state),
  products: getProducts(state),
});

export default connect(mapStateToProps, {
  receiveUser,
  updateUserAuth,
  checkUserAuthenticated,
})(Checkout);

const PaymentContainer = styled.div`
  position: absolute;
  top: 200px;
`;

const CheckoutContainer = styled.div`
  position: fixed;
  padding-top: 100px;
  padding-left: 30px;
  margin-left: 80px;
  width: 43vw;
  display: flex;
  flex-direction: column;
`;

const CheckoutOptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 35vw;
  margin-bottom: 20px;
`;

const GuestCheckoutButton = styled.button`
  margin-top: 20px;
  color: black;
  border-style: solid;
  border-width: 1px;
  border-color: black;
  background-color: white;
  font-weight: 600;
  width: 200px;
  padding: 10px;
  font-size: 13px;
`;

const MainTitle = styled.div`
  font-family: "Rubik", sans-serif;
  padding-bottom: 30px;
  font-size: 40px;
`;

const SubTitle = styled.div``;
