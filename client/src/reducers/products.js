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

export default products;
