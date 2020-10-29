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
  const numItems = Object.keys(purchaseItems).length;
  const itemWord = numItems > 1 ? "items" : "item";
  return (
    <Sidebar open={open}>
      <TopBar>
        <Close
          src={process.env.PUBLIC_URL + "/icons/close.svg"}
          onClick={() => updateSidebarStatus(false)}
        />
        <Img src={process.env.PUBLIC_URL + "/icons/basket.png"} />
        <NumItems>
          {numItems} {itemWord}
        </NumItems>
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

const Close = styled.img`
  width: 9px;
`;

const Sidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 24vw;
  background-color: white;
  border-left-style: solid;
  border-width: 1px;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  height: 100vh;
  padding: 0;
  position: fixed;
  top: 0;
  right: 0;
  z-index: 3;
  transition: transform 0.3s ease-in-out;
`;
