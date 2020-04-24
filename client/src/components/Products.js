import React, { useState, useEffect } from "react";
import { navigate } from "@reach/router";
import { connect } from "react-redux";
import { getProducts } from "../reducers/products";
import { getVendors } from "../reducers/vendors";
import Header from "./Header";
import styled from "styled-components";
import {
  checkUserAuthenticated,
  getAllProducts,
  getAllVendors,
} from "../actions";

const Products = ({
  products,
  getAllProducts,
  vendors,
  getAllVendors,
  checkUserAuthenticated,
}) => {
  const categories = Array.from(
    new Set(Object.keys(products).map((product) => products[product].category))
  );
  const productsByCategory = Object.keys(products).reduce((res, product) => {
    if (res[products[product].category]) {
      res[products[product].category].push(products[product]);
    } else {
      res[products[product].category] = [products[product]];
    }
    return res;
  }, {});
  useEffect(() => {
    getAllProducts();
    getAllVendors();
    checkUserAuthenticated();
  }, []);
  const onProductClick = (product) => {
    const vendor = vendors[product.vendor_id];
    navigate(`/product/${product.name}`, {
      state: {
        product,
        vendor,
        vendorProducts: Object.keys(products).reduce((res, product) => {
          if (products[product].vendor_id === vendor.id) {
            res.push(products[product]);
          }
          return res;
        }, []),
      },
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "fixed",
        width: "-webkit-fill-available",
        height: "100%",
        overflow: "scroll",
      }}
    >
      <Container>
        <Header />

        {/* <Container> */}
        {categories.map((category) => {
          return (
            // <div>
            <CategoryContainer>
              <Category>{category}</Category>
              <ProductsContainer>
                {productsByCategory[category].map((product) => {
                  return (
                    <Product onClick={() => onProductClick(product)}>
                      <ImageBox>
                        <ProductImg src={product.media} />
                      </ImageBox>
                      <InfoBox>
                        <Info>
                          <ProductName>{product.name}</ProductName>
                          <UnitCost>${product.unit_cost}.00/lb</UnitCost>
                        </Info>
                        {/* <AddToCartButton>Add To Cart</AddToCartButton> */}
                      </InfoBox>
                    </Product>
                  );
                })}
              </ProductsContainer>
            </CategoryContainer>
          );
        })}
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({
  products: getProducts(state),
  vendors: getVendors(state),
});

export default connect(mapStateToProps, {
  checkUserAuthenticated,
  getAllProducts,
  getAllVendors,
})(Products);

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  flex: 0 0 auto;
  margin-bottom: 50px;
`;
const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  // position: relative;
  z-index: 2;
  flex-wrap: wrap;
`;

const ProductContainer = styled.div``;

const Category = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
  font-weight: 300;
`;

const Product = styled.div`
  margin-bottom: 15px;
  margin-right: 10px;
`;

const ImageBox = styled.div`
  width: 150px;
  height: 200px;
  background-color: cornsilk;
  line-height: 250px;
  text-align: center;
`;

const ProductImg = styled.img`
  width: 130px;
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
  width: inherit;
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
