const cart = (state = {}, action) => {
  switch (action.type) {
    case "GET_CART_PRODUCTS":
      return { ...state.cart };
    case "ADD_TO_CART":
      const item = {
        [action.product.product]: { ...action.product },
      };
      return {
        ...state,
        ...item,
      };
    case "REMOVE_FROM_CART":
      return {
        ...action.cart,
      };
    default:
      return {};
  }
};

export const getCartProducts = (state) => {
  return state.cart;
};

export const aggregateCartTotals = (state) => {
  const cart = state.cart;
  const cartTotals = Object.keys(cart).reduce(
    (totals, product) => {
      totals["cost"] += cart[product].amount * cart[product].unitCost;
      totals["amount"] += cart[product].amount;
      return totals;
    },
    { cost: 0, amount: 0 }
  );
  return cartTotals;
};

export default cart;
