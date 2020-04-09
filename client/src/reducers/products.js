const products = (state = { test: "hi" }, action) => {
  switch (action.type) {
    case "GET_PURCHASE_ITEMS":
      return { ...state };
    case "SET_PURCHASE_ITEM":
      return {
        ...state,
      };
    case "ADD_PURCHASE_ITEM":
      const purchaseItem = action.purchaseItem;
      const aggregate = state[action.purchaseItem.product];
      if (aggregate) {
        aggregate.amount += purchaseItem.amount;
        aggregate.total += purchaseItem.total;
        aggregate.type = purchaseItem.type;
        return { ...state };
      } else {
        const newItem = {
          [purchaseItem.product]: {
            amount: purchaseItem.amount,
            unitCost: purchaseItem.unitCost,
            type: purchaseItem.type,
          },
        };
        return {
          ...state,
          newItem,
        };
      }
    default:
      return state;
  }
};

export default products;
