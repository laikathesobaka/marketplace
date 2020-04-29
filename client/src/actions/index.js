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
  try {
    const res = await fetch("/authenticated");
    const authRes = await res.json();
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

export const updateShowSearch = (status) => ({
  type: "SHOW_SEARCH",
  status,
});

export const getAllProducts = () => async (dispatch) => {
  let products;
  try {
    const productsRes = await fetch("/products", { method: "GET" });
    products = await productsRes.json();
  } catch (err) {
    console.log("Error occurred fetching products: ", err);
  }
  dispatch({
    type: "GET_PRODUCTS",
    products,
  });
};

export const getAllVendors = () => async (dispatch) => {
  let vendors;
  try {
    const vendorsRes = await fetch("/vendors", { method: "GET" });
    vendors = await vendorsRes.json();
    console.log("VENDORS FETCH RES -------- ", vendors);
  } catch (err) {
    console.log("Error occurred fetching vendors: ", err);
  }
  dispatch({
    type: "GET_VENDORS",
    vendors,
  });
};

export const addToCart = (purchaseItem) => ({
  type: "ADD_TO_CART",
  purchaseItem,
});

export const addToCartNew = (purchaseItem) => ({
  type: "ADD_TO_CART",
  purchaseItem,
});

export const addToCartExisting = (existingProduct, newProduct) => {
  console.log("ADDING TO CART EXISTING: ", existingProduct, newProduct);
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
