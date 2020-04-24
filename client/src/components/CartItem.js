import React from "react";
import styled from "styled-components";

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
    console.log("REMOVE CLICKED!");
    removeFromCart(productName);
  };
  return (
    <Container>
      <CartItemContainer>
        <Details>
          <div>
            {name} x {amount}lbs
          </div>
          <div>${total}.00</div>
        </Details>
        <div style={{ verticalAlign: "middle" }}>
          <ProductImg src={media} />
        </div>
        <Subscription>{subscription}</Subscription>
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

const Details = styled.div`
  margin-top: 10px;
  text-align: center;
  font-size: 12px;
  font-weight: 300;
  margin-right: 10px;
`;

const Container = styled.div`
  margin-bottom: 10px;
`;
const CartItemContainer = styled.div`
  position: relative;
  width: 110px;
  height: 120px;
  background-color: deepskyblue;
  border-style: solid;
  border-width: 0.01em;
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
  border-style: solid;
  border-top-style: none;
  border-color: black;
  width: 110px;
  height: 30px;
  color: black;
`;

const Subscription = styled.div`
  font-size: 10px;
  font-weight: 600;
  position: absolute;
  bottom: 15px;
  text-align: center;
  width: inherit;
`;
