import React from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import { navigate } from "@reach/router";
import { formatPrice } from "../helpers/formatPrice";

const Cart = ({
  cartItems,
  cartTotals,
  products,
  remove,
  removeFromCart,
  checkout,
  updateSidebarStatus,
}) => {
  const onCheckoutClick = async () => {
    updateSidebarStatus(false);
    await navigate("/checkout");
  };
  return (
    <CartContainer>
      <CartItemContainer>
        {Object.keys(cartItems).map((item) => {
          return (
            <CartItem
              productID={item}
              name={cartItems[item].productName}
              amount={cartItems[item].amount}
              total={cartItems[item].total}
              media={cartItems[item].media}
              subscription={cartItems[item].subscription}
              remove={remove}
              removeFromCart={removeFromCart}
            />
          );
        })}
      </CartItemContainer>
      <TotalsContainer checkout={checkout}>
        <Total>
          <div>Order Total</div>
          <div>${formatPrice(cartTotals.cost)}</div>
        </Total>
        {checkout && (
          <CheckoutButton onClick={() => onCheckoutClick()}>
            Checkout
          </CheckoutButton>
        )}
      </TotalsContainer>
    </CartContainer>
  );
};

export default Cart;

const CartContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 100px;
`;

const CheckoutButton = styled.button`
  cursor: pointer;
  font-size: 14px;
  padding: 10px;
  width: 200px;
  background-blend-mode: color;
  border-style: none;
  background-color: black;
  color: white;
  &:hover {
    opacity: 0.8;
  }
`;

const Total = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  margin-bottom: 20px;
  width: -webkit-fill-available;
  justify-content: space-around;
`;

const TotalsContainer = styled.div`
  position: fixed;
  bottom: 0;
  height: 200px;
  border-top-style: solid;
  border-width: 1px;
  background-color: white;
  width: 24vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CartItemContainer = styled.div`
  display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 80%;
    &:after {
        content: "",
        flex: auto
    }
  overflow: auto;
  min-height: min-content;
  overflow-y: auto;
  height: auto;
  position: relative;
  max-height: 64vh;
`;
