import React, { useState } from "react";
import styled from "styled-components";
import Cart from "./Cart";

const OrderSummary = ({ cart, cartTotals, products }) => {
  {
    console.log("ORDER SUMM CART ITEMS ---------- ", cart);
    console.log("ORDER SUMMCART PRODUCTS ---- ", products);
    console.log("ORDER SUM CART TOTALS ", cartTotals);
  }
  return (
    <SummaryContainer>
      <Title>Order Summary - {cartTotals.amount} items</Title>
      <Cart
        cart={cart}
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
  margin-left: 40px;
  margin-top: 50px;
  margin-bottom: 50px;
`;
const SummaryContainer = styled.div`
  position: fixed;
  right: 0;
  border-left-style: solid;
  border-width: 1px;
  height: 100%;
  width: 35%;
`;
