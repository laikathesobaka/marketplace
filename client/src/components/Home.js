import React, { useEffect } from "react";
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
import {
  removeFromCart,
  receiveUser,
  removeUser,
  updateCartSidebarStatus,
  checkUserAuthenticated,
  updateUserAuth,
  updateAccountSidebarStatus,
  getAllProducts,
} from "../actions";

import CartSidebar from "./CartSidebar";
import AccountSidebar from "./AccountSidebar";
import NavBar from "./NavBar";

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
}) => {
  useEffect(() => {
    const seedProducts = async () => {
      try {
        await fetch("/products", { method: "POST" });
      } catch (err) {
        console.log("Error occurred seeding products");
      }
    };
    seedProducts();
    // getAllProducts();
    checkUserAuthenticated();
  }, []);

  const onCounterSidebarClick = () => {
    updateAccountSidebarStatus(false);
    updateCartSidebarStatus(false);
  };
  return (
    <div>
      <div>
        <CounterSidebar onClick={() => onCounterSidebarClick()} />
        {/* {console.log("HOME > USER LOGGED IN ?", userAuthStatus)} */}
        <NavBar
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
  userAuthStatus: getUserAuthStatus(state),
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
})(Home);

const CounterSidebar = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: -1;
`;
