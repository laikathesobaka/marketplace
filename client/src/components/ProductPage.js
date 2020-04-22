import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import About from "./About";
import AddItems from "./AddItems";
import Header from "./Header";
import { useNavigate } from "@reach/router";

const ProductPage = (props) => {
  const { product } = props.location.state;
  const navigate = useNavigate();

  return (
    <div>
      <HomeIcon
        src={process.env.PUBLIC_URL + "/home.png"}
        onClick={() => navigate("/")}
      />
      <Header />
      <ProductContainer>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <Img src={product.media} />
          </div>
          <div>
            <ProductName>{product.name}</ProductName>
            <About />
            <AddItems product={product} />
          </div>
        </div>
      </ProductContainer>
    </div>
  );
};

export default ProductPage;

const HomeIcon = styled.img`
  width: 20px;
  margin-left: 30px;
`;

const ProductContainer = styled.div`
  display: flex;
  width: -webkit-fill-available;
  height: -webkit-fill-available;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ProductName = styled.div`
  font-size: 20px;
  font-weight: bold;
`;

const Img = styled.img`
  width: 281px;
  margin-right: 20px;
  background-color: bisque;
`;
