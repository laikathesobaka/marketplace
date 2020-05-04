import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { formatPrice } from "../helpers/formatPrice";
import { Link } from "@reach/router";

const Product = ({
  product,
  products,
  vendor,
  vendors,
  forSearchBar,
  resetSearchResults,
}) => {
  const [vendorProducts, setVendorProducts] = useState([]);
  useEffect(() => {
    const res = [];
    if (products && vendor) {
      for (const productID in products) {
        if (products[productID].vendor_id === vendor.id) {
          res.push(products[productID]);
        }
      }
      setVendorProducts([...vendorProducts, ...res]);
    }
  }, []);

  const linkParams = {
    state: {
      product,
      vendor,
      vendorProducts,
    },
    style: { textDecoration: "none" },
  };

  if (forSearchBar) {
    {
      console.log("PRODUCT PARAMS -------------- ", product, vendor, vendors);
    }
    return (
      <Link
        to={`/product/${product.name}`}
        onClick={() => resetSearchResults()}
        state={linkParams.state}
        style={linkParams.style}
      >
        <SearchBarItem>
          <SearchImg src={product.media} />
          <SearchName>{product.name}</SearchName>
        </SearchBarItem>
      </Link>
    );
  } else {
    return (
      <ProductContainer>
        <Link
          to={`/product/${product.name}`}
          state={linkParams.state}
          style={linkParams.style}
        >
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
        </Link>
      </ProductContainer>
    );
  }
};

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 20%;
  height: 230px;
  cursor: pointer;
  margin-bottom: 15px;
  margin-right: 10px;
  border-style: solid;
  border-color: #000000b3;
  border-width: 1px;
  background-color: mintcream;
  &:hover {
    background-color: lavenderblush;
  }
`;

const ImageBox = styled.div`
  height: 160px;
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
  padding-left: 15px;
  color: black;
  font-size: 11px;
`;

const InfoBox = styled.div`
  display: flex;
  align-items: center;
  width: inherit;
  height: 70px;
`;

const ProductName = styled.div`
  font-weight: 700;
  font-size: 12px;
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

const SearchBarItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  font-size: 10px;
  padding: 20px;
  border-style: solid;
  border-width: 1px;
  border-color: black;
  background-color: aliceblue;
  height: 50px;
  margin-left: 5px;
  margin-right: 5px;
`;

const SearchName = styled.div`
  color: black;
  padding-top: 2px;
`;

const SearchImg = styled.img`
  width: 50px;
  height: 40px;
  object-fit: contain;
`;

export default Product;
