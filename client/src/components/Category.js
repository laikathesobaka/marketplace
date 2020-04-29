import React from "react";
import Product from "./Product";
import { navigate } from "@reach/router";
import styled from "styled-components";

const Category = ({ location }) => {
  const category = location.state.category;
  const products = location.state.products;
  const vendors = location.state.vendors;

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
    <Container>
      {console.log("LOCATION IN CATEGORY ----- ", location)}
      <Title>{category}</Title>
      <ProductsContainer>
        {Object.keys(products).map((productID) => {
          if (products[productID].category === category) {
            return (
              <Product
                product={products[productID]}
                onProductClick={onProductClick}
              />
            );
          }
        })}
      </ProductsContainer>
    </Container>
  );
};

export default Category;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  margin-bottom: 100px;
`;
const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 70%;
`;
const Title = styled.div`
  margin-bottom: 30px;
  font-weight: bold;
`;
