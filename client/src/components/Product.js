import React from "react";
import styled from "styled-components";
import { formatPrice } from "../helpers/formatPrice";

const Product = ({ product, onProductClick }) => {
  return (
    <ProductContainer onClick={() => onProductClick(product)}>
      <ImageBox>
        <ProductImg src={product.media} />
      </ImageBox>
      <InfoBox>
        <Info>
          <ProductName>{product.name}</ProductName>
          <UnitCost>${formatPrice(product.unit_cost)}/lb</UnitCost>
        </Info>
      </InfoBox>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 20%;
  margin-bottom: 15px;
  margin-right: 10px;
  border-style: solid;
  border-width: 1px;
`;

const ImageBox = styled.div`
  height: 200px;
  //   background-color: cornsilk;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProductImg = styled.img`
  width: 130px;
  background-color: inherit;
  max-width: 100%;
  height: auto;
  vertical-align: middle;
`;

const Info = styled.div`
  width: inherit;
  padding-right: 10px;
  padding-left: 10px;
  color: black;
  font-size: 11px;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  width: inherit;
  height: 65px;
`;

const ProductName = styled.div`
  font-weight: 700;
  font-size: 14px;
`;

const UnitCost = styled.div`
  font-size: 13px;
`;

export default Product;
