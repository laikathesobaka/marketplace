const initialState = { items: {}, list: [], showSidebar: false };
const cart = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CART_PRODUCTS":
      return { ...state, ...state.items };
    case "ADD_TO_CART":
      const purchaseItemKey =
        String(action.purchaseItem.productID) +
        action.purchaseItem.productName +
        action.purchaseItem.subscription;
      const existingPurchaseItem = state.items[purchaseItemKey];
      if (existingPurchaseItem) {
        const combined = {
          ...existingPurchaseItem,
          purchaseItemKey,
          amount: (existingPurchaseItem.amount += action.purchaseItem.amount),
          total: (existingPurchaseItem.total += action.purchaseItem.total),
        };
        return {
          ...state,
          items: { ...state.items, [purchaseItemKey]: combined },
          list: [...state.list, action.purchaseItem],
        };
      } else {
        return {
          ...state,
          items: {
            ...state.items,
            [purchaseItemKey]: { ...action.purchaseItem, purchaseItemKey },
          },
          list: [...state.list, action.purchaseItem],
        };
      }

    case "REMOVE_FROM_CART":
      const items = { ...state.items };
      if (items[action.productID]) {
        delete items[action.productID];
      }
      return {
        ...state,
        items,
        list: [...state.list.filter((item) => item.ID === action.productID)],
      };
    case "SHOW_CART_SIDEBAR":
      return {
        ...state,
        ...{ showSidebar: action.status },
      };
    default:
      return state;
  }
};

export const getCartProducts = (state) => {
  return state.cart.items;
};

export const getCartSidebarStatus = (state) => {
  if (state.cart) {
    return state.cart.showSidebar;
  }
  return false;
};

export const aggregateCartTotals = (state) => {
  const cart = { ...state.cart.items };
  const cartTotals = Object.keys(cart).reduce(
    (totals, productID) => {
      totals["cost"] += cart[productID].amount * cart[productID].unitCost;
      totals["amount"] += cart[productID].amount;
      if (!cart[productID].subscription) {
        totals["oneTime"].amount += cart[productID].amount;
        totals["oneTime"].cost +=
          cart[productID].amount * cart[productID].unitCost;
      } else {
        totals["subscription"].amount += cart[productID].amount;
        totals["subscription"].cost +=
          cart[productID].amount * cart[productID].unitCost;
      }
      return totals;
    },
    {
      cost: 0,
      amount: 0,
      subscription: { amount: 0, cost: 0 },
      oneTime: { amount: 0, cost: 0 },
    }
  );
  return cartTotals;
};

export default cart;
