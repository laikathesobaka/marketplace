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

export const addToCart = (product) => (dispatch, getState) => {
  const { cart } = getState();
  const productName = product.product;
  if (!cart[productName]) {
    dispatch(addToCartNew(product));
  } else {
    dispatch(addToCartExisting(cart[productName], product));
  }
};

export const addToCartNew = (product) => ({
  type: "ADD_TO_CART",
  product,
});

export const addToCartExisting = (existingProduct, newProduct) => {
  const product = { ...existingProduct };
  product.amount += newProduct.amount;
  product.total += newProduct.total;
  product.type = newProduct.type;
  return {
    type: "ADD_TO_CART",
    product,
  };
};

export const removeFromCart = (productName) => (dispatch, getState) => {
  const cart = { ...getState().cart };
  if (cart[productName]) {
    delete cart[productName];
  }
  dispatch({
    type: "REMOVE_FROM_CART",
    cart,
  });
};

export const checkout = () => {};
