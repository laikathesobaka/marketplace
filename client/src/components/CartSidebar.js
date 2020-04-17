import React, { useState } from "react";
import Checkout from "./Checkout";
import { Link } from "@reach/router";
import styled from "styled-components";
import Cart from "./Cart";

const CartSidebar = ({
  open,
  products,
  updateSidebarStatus,
  purchaseItems,
  purchaseItemsTotal,
  removePurchaseItem,
}) => {
  return (
    <Sidebar open={open}>
      <TopBar>
        {/* <div style={{ display: "flex", justifyContent: "flex-start" }}> */}
        <CloseButton onClick={() => updateSidebarStatus(false)}>X</CloseButton>
        <Title>Your Cart</Title>
        {/* </div> */}
        <NumItems>{purchaseItemsTotal.amount} items</NumItems>
      </TopBar>
      <Cart
        cartItems={purchaseItems}
        cartTotals={purchaseItemsTotal}
        products={products}
        remove={true}
        removeItem={removePurchaseItem}
        checkout={true}
      />
    </Sidebar>
  );
};

export default CartSidebar;

const NumItems = styled.div`
  position: fixed;
  right: 10px;
  font-size: 12px;
`;

const TopBar = styled.div`
  display: flex;
  //   flex-direction: row;
  justify-content: start;
  position: fixed;
  top: 20px;
  width: 100%;
`;

const CloseButton = styled.button`
  background-blend-mode: color;
  border-style: none;
  position: fixed;
  left: 20px;
`;

const Title = styled.div`
  position: fixed;
  left: 85px;
`;
const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;

  width: 35%;
  background: white;
  border-left-style: solid;
  border-width: 1px;
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
