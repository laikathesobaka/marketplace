import React, { useState } from "react";
import Checkout from "./Checkout";
import { Link } from "@reach/router";

import styled from "styled-components";

const CartSidebar = ({
  open,
  updateSidebar,
  purchaseItems,
  removePurchaseItem,
}) => {
  console.log("purchaseItems: ", purchaseItems);

  const itemsTotal = Object.keys(purchaseItems).reduce(
    (total, product) => {
      total["cost"] +=
        purchaseItems[product].unitCost * purchaseItems[product].amount;
      total["amount"] += purchaseItems[product].amount;
      return total;
    },
    { cost: 0, amount: 0 }
  );

  return (
    <Sidebar open={open}>
      <TopBar>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <button onClick={() => updateSidebar(false)}>Close</button>
          <div>Your Cart</div>
        </div>
        <NumItems>{itemsTotal.amount} items</NumItems>
      </TopBar>
      <div>
        {Object.keys(purchaseItems).map((product) => {
          return (
            <PurchaseItem>
              {product} x {purchaseItems[product].amount}
              <RemoveItem onClick={() => removePurchaseItem(product)}>
                Remove
              </RemoveItem>
            </PurchaseItem>
          );
        })}
      </div>
      <Summary>
        <div>Total: {itemsTotal.cost}</div>
        <StyledButton>
          <Link to="checkout">Checkout</Link>
        </StyledButton>
      </Summary>
    </Sidebar>
  );
};

export default CartSidebar;

const RemoveItem = styled.button``;
const PurchaseItem = styled.div``;

const Summary = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 20%;
  background-color: cadetblue;
`;
const NumItems = styled.div`
  position: fixed;
  right: 5px;
  font-size: 12px;
`;
const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 10px;
`;
const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 35%;
  background: #effffa;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  height: 100vh;
  text-align: left;
  padding: 0;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
  transition: transform 0.3s ease-in-out;
`;

const StyledButton = styled.button`
  padding: 5px 17px;
  background: blue;
`;
