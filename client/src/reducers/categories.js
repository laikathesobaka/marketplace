const categories = (state = [], action) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return action.categories;
    default:
      return state;
  }
};

export const getCategories = (state) => {
  return state.categories;
};

export default categories;
