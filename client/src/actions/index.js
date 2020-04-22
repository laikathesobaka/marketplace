import fetch from "cross-fetch";

export const receiveUser = (user) => ({
  type: "RECEIVE_USER",
  user,
});

export const removeUser = () => {
  const user = {};
  return {
    type: "REMOVE_USER",
    user,
  };
};

export const checkUserAuthenticated = () => async (dispatch) => {
  // let authenticated;
  try {
    const res = await fetch("/authenticated");
    const authRes = await res.json();
    console.log("AUTH RES !!!!!!!!!!!! ", authRes);
    // authenticated = authRes.authenticated;
    dispatch(updateUserAuth(authRes));
  } catch (err) {
    console.log(
      "Error occurred in checkUserAuthenticated pinging /authenticated: ",
      err
    );
  }
};

export const updateUserAuth = (authRes) => ({
  type: "UPDATE_USER_AUTH",
  authRes,
});

export const updateAccountSidebarStatus = (status) => ({
  type: "SHOW_ACCOUNT_SIDEBAR",
  status,
});

export const addToCart = (purchaseItem) => ({
  type: "ADD_TO_CART",
  purchaseItem,
});
// export const addToCart = (product) => (dispatch, getState) => {
//   const cartItems = { ...getState().cart.items };
// const match = Object.keys(cartItems).forEach((item) => {
//   if (cartItems[product.])
// });
// console.log("MATCH>>>> >", match);
// if (cartItems[product.ID]) {
//   dispatch(addToCartExisting(cartItems[product.ID], product));
// } else {
//   dispatch(addToCartNew(product));
// }
// if (!cartItems[productName]) {
//   dispatch(addToCartNew(product));
// } else {
//   dispatch(addToCartExisting(cartItems[productName], product));
// }
// return {
//   type: "ADD_TO_CART",
//   product,
// };
// };

export const addToCartNew = (purchaseItem) => ({
  type: "ADD_TO_CART",
  purchaseItem,
});

export const addToCartExisting = (existingProduct, newProduct) => {
  console.log("ADDING TO CART EXISTING: ", existingProduct, newProduct);
  // const product = { ...existingProduct };
  // product.amount += newProduct.amount;
  // product.total += newProduct.total;
  const product = {
    [existingProduct.productID]: {
      ...existingProduct,
      amount: (existingProduct.amount += newProduct.amount),
      total: (existingProduct.total += newProduct.total),
    },
  };
  return {
    type: "ADD_TO_CART",
    product,
  };
};

export const removeFromCart = (productID) => ({
  type: "REMOVE_FROM_CART",
  productID,
});

export const updateCartSidebarStatus = (status) => ({
  type: "SHOW_CART_SIDEBAR",
  status,
});

export const asyncUpdateCartSidebarStatus = async (status) => ({
  type: "SHOW_CART_SIDEBAR",
  status,
});

export const checkout = () => {};
