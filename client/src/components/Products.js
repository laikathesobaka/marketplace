import React, { useEffect } from "react";
import Product from "./Product";
import { navigate } from "@reach/router";
import { connect } from "react-redux";
import { getProducts } from "../reducers/products";
import { getVendors } from "../reducers/vendors";
import { getMarketplace } from "../reducers/marketplace";
import { getCategories } from "../reducers/categories";
import Header from "./Header";
import styled from "styled-components";
import {
  checkUserAuthenticated,
  getMarketplaceData,
  getCategoriesData,
  getAllProducts,
  getAllVendors,
} from "../actions";

// const categoryImageMap = {
//   produce: {
//     default: process.env.PUBLIC_URL + "/icons/salad.svg",
//     hover: process.env.PUBLIC_URL + "/icons/saladhover.svg",
//   },
//   dairy: {
//     default: process.env.PUBLIC_URL + "/icons/cheese.svg",
//     hover: process.env.PUBLIC_URL + "/icons/cheesehover.svg",
//   },
//   seafood: {
//     default: process.env.PUBLIC_URL + "/icons/fish.svg",
//     hover: process.env.PUBLIC_URL + "/icons/fishhover.svg",
//   },
//   poultry: {
//     default: process.env.PUBLIC_URL + "/icons/chicken.svg",
//     hover: process.env.PUBLIC_URL + "/icons/chickenhover.svg",
//   },
//   meat: {
//     default: process.env.PUBLIC_URL + "/icons/meat.svg",
//     hover: process.env.PUBLIC_URL + "/icons/meathover.svg",
//   },
// };

const Products = ({
  marketplace,
  categories,
  products,
  vendors,
  getMarketplaceData,
  getCategoriesData,
  getAllProducts,
  getAllVendors,
  checkUserAuthenticated,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
    checkUserAuthenticated();
    getMarketplaceData();
    getCategoriesData();
    getAllProducts();
    getAllVendors();
  }, []);

  // const categoryNames = Array.from(
  //   new Set(Object.keys(products).map((product) => products[product].category))
  // );

  const categoryNames = [];
  const categoriesByName = {};
  for (const c of categories) {
    // c.media.default = process.env.PUBLIC_URL + c.media.default;
    // c.media.hover = process.env.PUBLIC_URL + c.media.hover;
    categoryNames.push(c.name);
    categoriesByName[c.name] = c;
  }

  // const categoryNames = categories.map((c) => c.name);
  // const categoriesByName = categories.reduce((res, category) => {
  //   res[category.name] = category;
  //   return res;
  // }, {});

  // const productsByCategory = Object.keys(products).reduce((res, product) => {
  //   if (res[products[product].category]) {
  //     res[products[product].category].push(products[product]);
  //   } else {
  //     res[products[product].category] = [products[product]];
  //   }
  //   return res;
  // }, {});

  const onCategoryClick = (category) => {
    navigate(`/category/${category}`, {
      state: {
        category,
        products,
        vendors,
      },
    });
  };

  return (
    <Container>
      <ProductsContainer>
        {console.log(" 😇", process.env.PUBLIC_URL)}
        <CategoryTabs>
          {categoryNames.map((category) => (
            <CategoryTab onClick={() => onCategoryClick(category)}>
              <Img
                src={categoriesByName[category].media.default}
                onMouseOver={(e) =>
                  (e.currentTarget.src =
                    process.env.PUBLIC_URL +
                    categoriesByName[category].media.hover)
                }
                onMouseOut={(e) =>
                  (e.currentTarget.src =
                    process.env.PUBLIC_URL +
                    categoriesByName[category].media.default)
                }
              />
            </CategoryTab>
          ))}
        </CategoryTabs>
        {categoryNames.map((category) => {
          return (
            <CategoryContainer>
              <Category>{category}</Category>
              <CategoryProductsContainer>
                {categoriesByName[category].products
                  .slice(0, 8)
                  .map((product) => {
                    return (
                      <Product
                        product={product}
                        products={products}
                        vendor={vendors[product.vendor_id]}
                        vendors={vendors}
                      />
                    );
                  })}
              </CategoryProductsContainer>
              <SeeMore onClick={() => onCategoryClick(category)}>
                See more
              </SeeMore>
            </CategoryContainer>
          );
        })}
      </ProductsContainer>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  marketplace: getMarketplace(state),
  products: getProducts(state),
  vendors: getVendors(state),
  categories: getCategories(state),
});

export default connect(mapStateToProps, {
  checkUserAuthenticated,
  getAllProducts,
  getAllVendors,
  getMarketplaceData,
  getCategoriesData,
})(Products);

const Container = styled.div`
  display: flex;
  height: 100vh;
  overflow: scroll;
  width: 100vw;
`;

const ProductsContainer = styled.div`
  // margin-top: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  // margin-bottom: 50px;
  width: 100%;
`;

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 50%;
  justify-content: flex-start;
  margin-bottom: 60px;
`;

const CategoryProductsContainer = styled.div`
  display: flex;
  flex-direction: row;
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
  cursor: pointer;
  border-width: 1px;
  width: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  padding-top: 5px;
  border-color: black;
`;

const Category = styled.div`
  font-family: "Rubik", sans-serif;
  font-size: 15px;
  margin-bottom: 5px;
  font-weight: 300;
`;

const Img = styled.img`
  width: 35px;
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
  color: black;
  cursor: pointer;
  &:hover {
    background-color: black;
    color: white;
  }
  font-family: "Rubik", sans-serif;
`;
