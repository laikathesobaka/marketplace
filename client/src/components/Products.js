import React, { useState, useEffect } from "react";
import Product from "./Product";
import { Link, navigate } from "@reach/router";
import { connect } from "react-redux";
import { getProducts } from "../reducers/products";
import { getShowSearchStatus } from "../reducers/search";
import { getVendors } from "../reducers/vendors";
import Header from "./Header";
import SearchBar from "./SearchBar";
import styled from "styled-components";
import { formatPrice } from "../helpers/formatPrice";
import {
  checkUserAuthenticated,
  getAllProducts,
  getAllVendors,
  updateShowSearch,
} from "../actions";

const Products = ({
  products,
  getAllProducts,
  vendors,
  getAllVendors,
  checkUserAuthenticated,
  showSearch,
  updateShowSearch,
}) => {
  useEffect(() => {
    const seedProducts = async () => {
      try {
        await fetch("/products", { method: "POST" });
      } catch (err) {
        console.log("Error occurred seeding products");
      }
    };
    checkUserAuthenticated();
    seedProducts();
    getAllProducts();
    getAllVendors();
  }, []);

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

  const onProductClick = (product) => {
    console.log("CLICKED ON PRODUCT CLICK : ", product);
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

  const onCategoryClick = (category) => {
    navigate(`/category/${category}`, {
      state: {
        category,
        products,
        vendors,
      },
    });
  };

  const categoryImageMap = {
    produce: "🍅",
    dairy: "🧀",
    seafood: "🐟",
    poultry: "🐔",
    meat: "🥩",
  };
  return (
    <div
      style={{
        display: "flex",
        width: "-webkit-fill-available",
        height: "100%",
        overflow: "scroll",
      }}
    >
      <SearchBar
        show={showSearch}
        updateShowSearch={updateShowSearch}
        onProductClick={onProductClick}
        products={products}
      />
      <Container>
        <Header />
        <CategoryTabs>
          {categories.map((category) => (
            <CategoryTab onClick={() => onCategoryClick(category)}>
              {categoryImageMap[category]}
            </CategoryTab>
          ))}
        </CategoryTabs>
        {categories.map((category) => {
          return (
            <CategoryContainer>
              <Category>{category}</Category>
              <ProductsContainer>
                {productsByCategory[category].slice(0, 8).map((product) => {
                  return (
                    <Product
                      product={product}
                      onProductClick={onProductClick}
                    />
                  );
                })}
              </ProductsContainer>
              <SeeMore onClick={() => onCategoryClick(category)}>
                See more
              </SeeMore>
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
  showSearch: getShowSearchStatus(state),
});

export default connect(mapStateToProps, {
  checkUserAuthenticated,
  getAllProducts,
  getAllVendors,
  updateShowSearch,
})(Products);

const Container = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  // flex: 0 0 auto;
  align-items: center;
  margin-bottom: 50px;
  width: -webkit-fill-available;
`;
const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 55%;
  justify-content: flex-start;
  margin-bottom: 60px;
`;

const ProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
  // position: relative;
  z-index: 2;
  flex-wrap: wrap;
`;

const CategoryTabs = styled.div`
  display: flex;
  flex-direction: row;
  width: 54%;
  justify-content: center;
  margin-bottom: 30px;
  font-weight: bold;
`;

const CategoryTab = styled.div`
  display: flex;
  flex-grow: 1;
  font-size: 25px;
  border-style: solid;
  // border-bottom-style: none;
  border-width: 1px;
  width: 110px;
  border-radius: 100px 100px 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  padding-top: 5px;
  border-color: black;
`;

const Category = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
  font-weight: 300;
`;

const SeeMore = styled.div`
  font-size: 12px;
  border-style: solid;
  border-width: 1px;
  padding: 10px;
  width: 100px;
  text-align: center;
  margin-top: 25px;
  margin-bottom: 30px;
  align-self: center;
  color: darkviolet;
`;
