import React from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import { navigate } from "@reach/router";

const Cart = ({
  cartItems,
  cartTotals,
  products,
  remove,
  removeFromCart,
  checkout,
  updateSidebarStatus,
}) => {
  {
    console.log("CART ITEMS ---------- ", cartItems);
    console.log("CART TOTLAS ", cartTotals);
    console.log("CART PRODUCTS ---- ", products);
  }
  const onCheckoutClick = async () => {
    updateSidebarStatus(false);
    await navigate("/checkout");
  };
  return (
    <CartContainer>
      <CartItemContainer>
        {Object.keys(cartItems).map((item) => {
          console.log("ITEM: ", item);
          return (
            <CartItem
              productID={item}
              name={cartItems[item].name}
              amount={cartItems[item].amount}
              total={cartItems[item].total}
              media={products[cartItems[item].name].media}
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
          <div>${cartTotals.cost}.00</div>
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
  color: white;
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
  width: 100%;
  display: flex;
  flex-direction: ${(props) => (props.checkout ? "column" : "row")};
  align-items: center;
`;

const CartItemContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
