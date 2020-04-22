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
      {console.log("USER AT CHECKOUT ----- ", user)}
      {console.log("USER AUTH STATUS IN CHECKOUT ----- ", userAuthStatus)}
      <div style={{ order: "1" }}>
        <OrderSummarySidebar
          cart={cart}
          cartTotals={cartTotals}
          products={products}
        />
      </div>
      <div style={{ order: "2" }}>
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

const CheckoutContainer = styled.div`
  position: fixed;
  padding-top: 60px;
  padding-left: 30px;
  margin-left: 80px;
  display: flex;
  flex-direction: column;
`;

const CheckoutOptions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const GuestCheckoutButton = styled.button`
  margin-top: 20px;
  background-blend-mode: color;
  border-style: none;
  background-color: black;
  color: white;
  width: 200px;
  padding: 10px;
  font-size: 13px;
`;

const MainTitle = styled.div`
  padding-bottom: 30px;
  font-size: 40px;
`;

const SubTitle = styled.div``;
