import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import {
  getCartProducts,
  aggregateCartTotals,
  getCartSidebarStatus,
} from "../reducers/cart";
import {
  getUser,
  getUserAuthStatus,
  getAccountSidebarStatus,
} from "../reducers/user";
import { getProducts } from "../reducers/products";
import { getShowSearchStatus } from "../reducers/search";
import { getVendors } from "../reducers/vendors";
import {
  removeFromCart,
  receiveUser,
  removeUser,
  updateCartSidebarStatus,
  checkUserAuthenticated,
  updateUserAuth,
  updateAccountSidebarStatus,
  getAllProducts,
  getAllVendors,
  updateShowSearch,
} from "../actions";

import CartSidebar from "./CartSidebar";
import AccountSidebar from "./AccountSidebar";
import NavBar from "./NavBar";
import SearchBar from "./SearchBar";

const Home = ({
  products,
  getAllProducts,
  cart,
  cartTotals,
  cartSidebarStatus,
  updateCartSidebarStatus,
  removeFromCart,
  user,
  receiveUser,
  removeUser,
  userAuthStatus,
  checkUserAuthenticated,
  updateUserAuth,
  accountSidebarStatus,
  updateAccountSidebarStatus,
  showSearch,
  updateShowSearch,
}) => {
  useEffect(() => {
    // const seedProducts = async () => {
    //   try {
    //     await fetch("/products", { method: "POST" });
    //   } catch (err) {
    //     console.log("Error occurred seeding products");
    //   }
    // };
    // checkUserAuthenticated();
    // seedProducts();
    // getAllProducts();
    // getAllVendors();
  }, []);
  const onCounterSidebarClick = () => {
    updateAccountSidebarStatus(false);
    updateCartSidebarStatus(false);
  };
  return (
    <div>
      <div>
        {/* <CounterSidebar onClick={() => onCounterSidebarClick()} /> */}
        {/* {showSearch && <SearchBar products={products} />} */}
        <NavBar
          updateShowSearch={updateShowSearch}
          updateAccountSidebarStatus={updateAccountSidebarStatus}
          updateCartSidebarStatus={updateCartSidebarStatus}
        />
        <CartSidebar
          products={products}
          open={cartSidebarStatus}
          updateSidebarStatus={updateCartSidebarStatus}
          getCartSidebarStatus={getCartSidebarStatus}
          purchaseItems={cart}
          purchaseItemsTotal={cartTotals}
          removeFromCart={removeFromCart}
        />
        <AccountSidebar
          open={accountSidebarStatus}
          receiveUser={receiveUser}
          removeUser={removeUser}
          updateAccountSidebarStatus={updateAccountSidebarStatus}
          user={user}
          signedIn={userAuthStatus}
          updateUserAuth={updateUserAuth}
          checkUserAuthenticated={checkUserAuthenticated}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: getCartProducts(state),
  cartTotals: aggregateCartTotals(state),
  cartSidebarStatus: getCartSidebarStatus(state),
  accountSidebarStatus: getAccountSidebarStatus(state),
  user: getUser(state),
  products: getProducts(state),
  vendors: getVendors(state),
  userAuthStatus: getUserAuthStatus(state),
  showSearch: getShowSearchStatus(state),
});

export default connect(mapStateToProps, {
  removeFromCart,
  aggregateCartTotals,
  receiveUser,
  removeUser,
  updateCartSidebarStatus,
  updateAccountSidebarStatus,
  checkUserAuthenticated,
  updateUserAuth,
  getAllProducts,
  getAllVendors,
  updateShowSearch,
})(Home);

const CounterSidebar = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
`;
