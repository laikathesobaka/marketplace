import React from "react";
import styled from "styled-components";
import { formatPrice } from "../helpers/formatPrice";

const CartItem = ({
  productID,
  name,
  amount,
  total,
  media,
  subscription,
  remove,
  removeFromCart,
}) => {
  const removeItem = (productName) => {
    removeFromCart(productName);
  };
  return (
    <Container>
      <CartItemContainer>
        <Overview>
          {amount}lbs x {name}
        </Overview>
        <ProductImg src={media} />
        <div>
          <Subscription>{subscription}</Subscription>
          <Price>${formatPrice(total)}</Price>
        </div>
      </CartItemContainer>
      {remove && (
        <RemoveButton onClick={() => removeItem(productID)}>
          Remove
        </RemoveButton>
      )}
    </Container>
  );
};

export default CartItem;

const Overview = styled.div`
  font-weight: 500;
`;

const Price = styled.div`
  font-size: 11px;
`;

const Container = styled.div`
  width: 120px;
  height: 20vh;
  display: flex;
  flex-direction: column;
  margin-bottom: 17px;
`;
const CartItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  position: relative;
  height: inherit;
  background-color: floralwhite;
  border-style: solid;
  border-width: 0.01em;
  font-size: 12px;
`;

const ProductImg = styled.img`
  width: 40px;
`;

const RemoveButton = styled.button`
  cursor: pointer;
  border-style: solid;
  border-top-style: none;
  border-color: black;
  border-style: solid;
  border-top-style: none;
  border-color: black;
  height: 40px;
  color: black;
  &:hover {
    background-color: tomato;
  }
`;

const Subscription = styled.div`
  font-size: 10px;
  font-weight: 600;
`;
