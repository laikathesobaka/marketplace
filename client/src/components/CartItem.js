import React from "react";
import styled from "styled-components";

const CartItem = ({ name, amount, total, media, remove, removeItem }) => {
  return (
    <CartItemContainer>
      <Details>
        <div>
          {name} x {amount}
        </div>
        <div>${total}.00</div>
      </Details>
      <div style={{ verticalAlign: "middle" }}>
        <ProductImg src={media} />
      </div>
      {remove && (
        <RemoveButton onClick={() => removeItem(name)}>Remove</RemoveButton>
      )}
    </CartItemContainer>
  );
};

export default CartItem;

const Details = styled.div`
  margin-top: 10px;
  text-align: center;
  font-size: 12px;
  font-weight: 300;
`;
const CartItemContainer = styled.div`
  position: relative;
  width: 120px;
  height: 150px;
  border-style: solid;
  border-width: 0.01em;
  background-color: white;
  font-size: 14px;
`;

const ProductImg = styled.img`
  width: 40%;
  margin: 0;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const RemoveButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  border-style: solid;
  border-color: black;
  width: 100%;
  height: 30px;
  border-left-style: none;
`;
