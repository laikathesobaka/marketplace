import React, { useEffect } from "react";
import Product from "./Product";
import styled from "styled-components";

const Category = ({ location }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const category = location.state.category;
  const products = location.state.products;
  const vendors = location.state.vendors;

  return (
    <Container>
      <Title>{category}</Title>
      <ProductsContainer>
        {Object.keys(products).map((productID) => {
          if (products[productID].category === category) {
            return (
              <Product
                product={products[productID]}
                products={products}
                vendor={vendors[products[productID].vendor_id]}
                vendors={vendors}
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
  margin-bottom: 100px;
`;
const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 50%;
`;
const Title = styled.div`
  font-family: "Rubik", sans-serif;
  margin-bottom: 30px;
  margin-top: 100px;
  font-size: 20px;
  font-weight: 100;
`;
