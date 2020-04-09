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

export const addToCartExisting = (product, newProduct) => {
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
