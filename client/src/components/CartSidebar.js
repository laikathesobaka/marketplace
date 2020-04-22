import React from "react";
import styled from "styled-components";
import Cart from "./Cart";

const CartSidebar = ({
  open,
  products,
  updateSidebarStatus,
  purchaseItems,
  purchaseItemsTotal,
  removeFromCart,
}) => {
  return (
    <Sidebar open={open}>
      <TopBar>
        <CloseButton onClick={() => updateSidebarStatus(false)}>X</CloseButton>
        {/* <Title>Your Cart</Title> */}
        <Img src={process.env.PUBLIC_URL + "/basket.png"} />
        <NumItems>{purchaseItemsTotal.amount} items</NumItems>
      </TopBar>
      <Cart
        cartItems={purchaseItems}
        cartTotals={purchaseItemsTotal}
        products={products}
        remove={true}
        removeFromCart={removeFromCart}
        checkout={true}
        updateSidebarStatus={updateSidebarStatus}
      />
    </Sidebar>
  );
};

export default CartSidebar;

const Img = styled.img`
  width: 30px;
`;

const NumItems = styled.div`
  font-size: 11px;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: baseline;
  position: fixed;
  top: 20px;
  width: 100%;
`;

const CloseButton = styled.button`
  background-blend-mode: color;
  border-style: none;
  color: black;
`;

const Title = styled.div``;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 35%;
  background-color: white;
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
