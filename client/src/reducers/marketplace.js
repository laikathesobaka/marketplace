const marketplace = (state = {}, action) => {
  switch (action.type) {
    case "GET_MARKETPLACE":
      return action.marketplace;
    default:
      return state;
  }
};

export const getMarketplace = (state) => {
  return state.marketplace;
};

export default marketplace;
