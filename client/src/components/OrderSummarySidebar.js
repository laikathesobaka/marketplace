import React, { useState } from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import Cart from "./Cart";

const OrderSummary = ({ cart, cartTotals, products }) => {
  {
    console.log("ORDER SUMM CART ITEMS ---------- ", cart);
    console.log("ORDER SUMMCART PRODUCTS ---- ", products);
    console.log("ORDER SUM CART TOTALS ", cartTotals);
  }
  return (
    <SummaryContainer>
      <Title>Order Summary - {Object.keys(cart).length} items</Title>
      <Cart
        cartItems={cart}
        cartTotals={cartTotals}
        products={products}
        remove={false}
        checkout={false}
      />
    </SummaryContainer>
  );
};

export default OrderSummary;

const Title = styled.div`
  display: flex;
  justify-content: space-around;
  position: fixed;
  top: 20px;
  width: 24vw;
`;

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 24vw;
  background-color: white;
  border-left-style: solid;
  border-width: 1px;
  height: 100vh;
  text-align: left;
  padding: 0;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1;
`;
