const products = (state = {}, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return { ...state, ...action.products, ...action.categories };
    default:
      return state;
  }
};

export const getProducts = (state) => {
  return state.products;
};

export const getProductsByCategory = (state, category) => {
  const products = state.products;
  const res = {};
  for (const productID of state.products) {
    if (products[productID].category === category) {
      res[productID] = products[productID];
    }
  }
  return products;
};

export const getShowSearchStatus = (state) => {
  return state.products.showSearch;
};

export default products;
