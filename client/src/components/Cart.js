import React from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import { Link } from "@reach/router";

const Cart = ({
  cartItems,
  cartTotals,
  products,
  remove,
  removeItem,
  checkout,
}) => {
  {
    console.log("CART ITEMS ---------- ", cartItems);
    console.log("CART PRODUCTS ---- ", products);
  }
  return (
    <CartContainer>
      <CartItemContainer>
        {Object.keys(cartItems).map((item) => {
          return (
            <CartItem
              name={item}
              amount={cartItems[item].amount}
              total={cartItems[item].total}
              media={products[item].media}
              remove={remove}
              removeItem={removeItem}
            />
          );
        })}
      </CartItemContainer>
      <TotalsContainer>
        <Total>
          <div>Order Total</div>
          <div>${cartTotals.cost}.00</div>
        </Total>
        {checkout && (
          <CheckoutButton>
            <Link
              to="checkout"
              style={{ textDecoration: "none", color: "white" }}
            >
              Checkout
            </Link>
          </CheckoutButton>
        )}
      </TotalsContainer>
    </CartContainer>
  );
};

export default Cart;

const CartContainer = styled.div`
  text-align: center;
  margin-top: 100px;
`;

const CheckoutButton = styled.button`
  font-size: 14px;
  padding: 10px;
  width: 235px;
  background-blend-mode: color;
  border-style: none;
  background-color: black;
`;

const Total = styled.div`
  font-weight: bold;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 40px;
  margin-bottom: 20px;
  width: 230px;
`;
const TotalsContainer = styled.div`
  position: fixed;
  bottom: 0;
  height: 200px;
  border-top-style: solid;
  border-width: 1px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CartItemContainer = styled.div`
  margin-left: 30px;
`;
