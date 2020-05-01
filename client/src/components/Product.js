import React from "react";
import styled from "styled-components";
import { formatPrice } from "../helpers/formatPrice";

const Product = ({ product, vendor, onProductClick }) => {
  return (
    <ProductContainer onClick={() => onProductClick(product)}>
      <ImageBox>
        <ProductImg src={product.media} />
      </ImageBox>
      <InfoBox>
        <Info>
          <ProductName>{product.name}</ProductName>
          <UnitCost>${formatPrice(product.unit_cost)}/lb</UnitCost>
          {vendor && (
            <Farmer>
              <FarmIcon src={process.env.PUBLIC_URL + "/icons/farm.svg"} />
              <div>{vendor.name}'s farm</div>
            </Farmer>
          )}
        </Info>
      </InfoBox>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 20%;
  height: 230px;
  //   width: 150px;
  margin-bottom: 15px;
  margin-right: 10px;
  border-style: solid;
  border-width: 1px;
  //   background-color: honeydew;
  background-color: mintcream;
  &:hover {
    background-color: lavenderblush;
  }
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
  width: 100px;
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
  font-size: 11px;
`;

const Farmer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: end;
  margin-bottom: 5px;
  margin-top: 3px;
`;

const FarmIcon = styled.img`
  width: 13px;
  margin-right: 4px;
`;

export default Product;
