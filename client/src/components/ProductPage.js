import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { getVendors } from "../reducers/vendors";
import { getAllVendors } from "../actions";
import styled from "styled-components";
import About from "./About";
import AddItems from "./AddItems";
import Header from "./Header";
import { useNavigate } from "@reach/router";
import fetch from "cross-fetch";

const ProductPage = (props) => {
  const { product, vendor, vendorProducts } = props.location.state;
  const navigate = useNavigate();
  const onProductClick = (prod) => {
    // const vendor = vendors[product.vendor_id];
    navigate(`/product/${prod.name}`, {
      state: {
        product: prod,
        vendor,
        vendorProducts,
      },
    });
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div style={{ marginTop: "50px" }}>
        <Header />
        <Container>
          <ProductContainer>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <ImgContainer>
                <Img src={product.media} />
              </ImgContainer>
              <ProductInfoContainer>
                <div>
                  <ProductName>{product.name}</ProductName>
                  <About unitCost={product.unit_cost} />
                </div>
                <AddItems product={product} />
              </ProductInfoContainer>
            </div>
            <VendorContainer>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <FarmIcon src={process.env.PUBLIC_URL + "/farm2.png"} />
                <Farmer>Other products from {vendor.name}'s farm</Farmer>
              </div>
              <OtherVendorProducts>
                {vendorProducts.map((vendorProduct) => {
                  if (vendorProduct.id !== product.id) {
                    return (
                      <OtherProduct
                        onClick={() => onProductClick(vendorProduct)}
                      >
                        <OtherProductImg src={vendorProduct.media} />
                      </OtherProduct>
                    );
                  }
                })}
              </OtherVendorProducts>
            </VendorContainer>
          </ProductContainer>
        </Container>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  vendors: getVendors(state),
});
export default connect(mapStateToProps, {
  getAllVendors,
})(ProductPage);

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const ProductContainer = styled.div`
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 50px;
`;

const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const VendorContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
`;

const ProductName = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const ImgContainer = styled.div`
  background-color: bisque;
  display: flex;
  margin-right: 15px;
`;

const Img = styled.img`
  width: 281px;
  margin: auto;
`;

const FarmIcon = styled.img`
  width: 40px;
`;

const Farmer = styled.div`
  padding: 10px;
  margin-top: 10px;
  font-size: 15px;
  font-weight: 500;
`;

const OtherVendorProducts = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  margin-top: 12px;
`;

const OtherProduct = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  border-style: solid;
  border-width: 0.01em;
  border-color: darkgray;
  font-size: 14px;
  margin-top: 10px;
  margin-right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OtherProductImg = styled.img`
  width: 60px;
`;
