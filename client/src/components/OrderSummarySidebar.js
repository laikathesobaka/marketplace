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
      <Title>Order Summary - {cartTotals.amount} items</Title>
      <Cart
        cartItems={cart}
        cartTotals={cartTotals}
        products={products}
        remove={false}
        checkout={false}
      />
      {/* <div>
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
      </div>
      <TotalsContainer>
        <Total>
          <div>Order Total</div>
          <div>${cartTotals.cost}.00</div>
        </Total>
      </TotalsContainer> */}
    </SummaryContainer>
  );
};

export default OrderSummary;

const Total = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-top: 40px;
`;

const TotalsContainer = styled.div`
  position: fixed;
  bottom: 0;
  height: 200px;
  border-top-style: solid;
  border-left-style: solid;
  border-width: 1px;
  width: 35%;
`;

const Title = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  text-align: center;
`;

const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 35%;
  background-color: white;
  border-left-style: solid;
  border-width: 1px;
  height: 100vh;
  text-align: left;
  padding: 0;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
`;

const OrderItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  border-left-style: solid;
`;
