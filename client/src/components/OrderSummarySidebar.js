import React, { useState } from "react";
import styled from "styled-components";
import CartItem from "./CartItem";

const OrderSummary = ({ cart, cartTotals, products }) => {
  {
    console.log("ORDER SUMM CART ITEMS ---------- ", cart);
    console.log("ORDER SUMMCART PRODUCTS ---- ", products);
    console.log("ORDER SUM CART TOTALS ", cartTotals);
  }
  return (
    <SummaryContainer>
      <Title>Order Summary - {cartTotals.amount} items</Title>
      <OrderItemContainer>
        {Object.keys(cart).map((item) => {
          return (
            <CartItem
              name={item}
              amount={cart[item].amount}
              total={cart[item].total}
              media={products[item].media}
            />
          );
        })}
      </OrderItemContainer>
      <TotalsContainer>
        <Total>
          <div>Order Total</div>
          <div>${cartTotals.cost}.00</div>
        </Total>
      </TotalsContainer>
    </SummaryContainer>
  );
};

export default OrderSummary;

const Total = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 40px;
  margin-left: 40px;
  width: 230px;
`;
const TotalsContainer = styled.div`
  position: fixed;
  bottom: 0;
  height: 200px;
  border-top-style: solid;
  border-width: 1px;
  width: 100%;
`;
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
  width: 40%;
`;

const OrderItemContainer = styled.div`
  margin-left: 30px;
`;
