import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { connect } from "react-redux";
import { getProducts } from "../reducers/products";
import Header from "./Header";

import styled from "styled-components";
import { checkUserAuthenticated } from "../actions";

const Products = ({ products, checkUserAuthenticated }) => {
  useEffect(() => {
    checkUserAuthenticated();
  }, []);
  const onProductClick = (product) => {
    navigate(`/product/${product}`, {
      state: {
        product: products[product],
      },
    });
  };
  return (
    <div>
      <Header />
      <ProductsContainer>
        {Object.keys(products).map((product) => {
          return (
            <Product onClick={() => onProductClick(product)}>
              <ImageBox>
                <ProductImg src={products[product].media} />
              </ImageBox>

              <InfoBox>
                <Info>
                  <ProductName>{product}</ProductName>
                  <UnitCost>${products[product].unitCost}.00/lb</UnitCost>
                </Info>
                {/* <AddToCartButton>Add To Cart</AddToCartButton> */}
              </InfoBox>
            </Product>
          );
        })}
      </ProductsContainer>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: getProducts(state),
});

export default connect(mapStateToProps, { checkUserAuthenticated })(Products);

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 110px;
`;

const Product = styled.div``;

const ImageBox = styled.div`
  width: 200px;
  height: 250px;
  background-color: cornsilk;
  line-height: 250px;
  text-align: center;
`;

const ProductImg = styled.img`
  width: 150px;
  background-color: inherit;
  max-width: 100%;
  height: auto;
  vertical-align: middle;
`;

const Info = styled.div`
  padding-left: 15px;
  padding-top: 6px;
`;

const InfoBox = styled.div`
  width: 200px;
  height: 50px;
  background-color: deeppink;
`;

const ProductName = styled.div`
  font-weight: 700;
  font-size: 14px;
`;

const UnitCost = styled.div`
  font-size: 13px;
`;

const AddToCartButton = styled.button``;
