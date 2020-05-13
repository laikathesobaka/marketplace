import React, { useEffect } from "react";
import { connect } from "react-redux";
import { getProducts } from "../reducers/products";
import { getAccountSidebarStatus } from "../reducers/user";
import { getCartSidebarStatus } from "../reducers/cart";
import { getShowSearchStatus } from "../reducers/search";
import { updateShowSearch } from "../actions";
import styled from "styled-components";
import About from "./About";
import AddItems from "./AddItems";
import Header from "./Header";
import { useNavigate } from "@reach/router";

const ProductPage = ({ location }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const { product, vendor, vendorProducts } = location.state;
  const navigate = useNavigate();
  const onProductClick = (prod) => {
    navigate(`/product/${prod.name}`, {
      state: {
        product: prod,
        vendor,
        vendorProducts,
      },
    });
  };
  return (
    <Container>
      <div style={{ marginTop: "50px" }}>
        <Header />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
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
        </div>
      </div>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  products: getProducts(state),
  cartSidebarStatus: getCartSidebarStatus(state),
  accountSidebarStatus: getAccountSidebarStatus(state),
  showSearch: getShowSearchStatus(state),
});
export default connect(mapStateToProps, {
  updateShowSearch,
})(ProductPage);

const Container = styled.div`
  display: flex;
  flex-direction: column;
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
  cursor: pointer;
  &:hover {
    background-color: ghostwhite;
  }
`;

const OtherProductImg = styled.img`
  width: 60px;
`;
