const initialState = { products: [], vendors: [], categories: [] };
const search = (state = initialState, action) => {
  switch (action.type) {
    case "SHOW_SEARCH":
      return {
        ...state,
        ...{ showSearch: action.status },
      };
    default:
      return state;
  }
};

export const getShowSearchStatus = (state) => {
  return state.search.showSearch;
};

export default search;
