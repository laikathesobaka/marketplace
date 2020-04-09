import React, { useState } from "react";
import Checkout from "./Checkout";
import { Link } from "@reach/router";

import styled from "styled-components";

const CartSidebar = ({
  open,
  updateSidebarStatus,
  purchaseItems,
  purchaseItemsTotal,
  removePurchaseItem,
}) => {
  return (
    <Sidebar open={open}>
      <TopBar>
        <div style={{ display: "flex", justifyContent: "flex-start" }}>
          <button onClick={() => updateSidebarStatus(false)}>Close</button>
          <div>Your Cart</div>
        </div>
        <NumItems>{purchaseItemsTotal.amount} items</NumItems>
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
        <div>Total: {purchaseItemsTotal.cost}</div>
        <StyledButton>
          <Link to="checkout" purchaseItemsTotal={purchaseItemsTotal}>
            Checkout
          </Link>
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
