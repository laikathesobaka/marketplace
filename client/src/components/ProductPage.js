import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCartProducts, aggregateCartTotals } from "../reducers/cart";
import { getUser } from "../reducers/user";
import { getProducts } from "../reducers/products";
import { addToCart, removeFromCart, receiveUser, removeUser } from "../actions";

import styled from "styled-components";
import Header from "./Header";
import Image from "./Image";
import About from "./About";
import AddItems from "./AddItems";
import CartSidebar from "./CartSidebar";
import AccountSidebar from "./AccountSidebar";
import NavBar from "./NavBar";

const ProductPage = ({
  products,
  cart,
  cartTotals,
  addToCart,
  removeFromCart,
  receiveUser,
  removeUser,
  user,
  // signedInStatus,
}) => {
  const [showCartSidebar, setShowCartSidebar] = useState(false);
  const [showAccountSidebar, setShowAccountSidebar] = useState(false);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const [unitCost, setUnitCost] = useState(10);
  const [product, setProduct] = useState("garlic");
  const [type, setType] = useState("one-time");
  const [loggedIn, setIsLoggedIn] = useState(false);
  const updateCartSidebarStatus = (status) => {
    setShowCartSidebar(status);
  };
  const updateAccountSidebarStatus = (status) => {
    setShowAccountSidebar(status);
  };
  const updateSignedInStatus = (status) => {
    setIsLoggedIn(status);
  };
  const createPurchaseItem = (purchase) => {
    setAmount(purchase.amount);
    setTotal(purchase.total);
    setUnitCost(purchase.unitCost);
    setProduct(purchase.product);
    setType(purchase.type);
    addToCart(purchase);
  };
  useEffect(() => {
    const getSignedInUser = async () => {
      try {
        const res = await fetch("/authenticated");
        const userRes = await res.json();
        console.log("GET SIGNED IN USER  RES ! ", userRes);
        setIsLoggedIn(userRes.authenticated);
      } catch (err) {
        throw err;
      }
    };

    getSignedInUser();
  }, [loggedIn, user]);
  return (
    <div>
      <CartSidebar
        products={products}
        open={showCartSidebar}
        updateSidebarStatus={updateCartSidebarStatus}
        purchaseItems={cart}
        purchaseItemsTotal={cartTotals}
        removePurchaseItem={removeFromCart}
      />
      {console.log("LOGGED IN STATUS ---------------- !!!!!!!", loggedIn)}
      <AccountSidebar
        open={showAccountSidebar}
        receiveUser={receiveUser}
        removeUser={removeUser}
        updateAccountSidebarStatus={updateAccountSidebarStatus}
        signedIn={loggedIn}
        updateSignedInStatus={updateSignedInStatus}
      />
      <NavBar
        signedIn={loggedIn}
        updateAccountSidebarStatus={updateAccountSidebarStatus}
      />
      <div style={{ display: "flex", flexDirection: "column" }}>
        <Header />

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <Image />
          </div>
          <div>
            <ProductName>Garlic</ProductName>
            <About />
            <AddItems
              amount={amount}
              updateAmount={setAmount}
              total={total}
              updateTotal={setTotal}
              updateSidebarStatus={updateCartSidebarStatus}
              createPurchaseItem={createPurchaseItem}
              removePurchaseItem={removeFromCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: getCartProducts(state),
  cartTotals: aggregateCartTotals(state),
  user: getUser(state),
  products: getProducts(state),
});

export default connect(mapStateToProps, {
  addToCart,
  removeFromCart,
  aggregateCartTotals,
  receiveUser,
  removeUser,
})(ProductPage);

const ProductName = styled.div`
  font-size: 20px;
  font-weight: bold;
`;
