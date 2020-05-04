const vendors = (state = {}, action) => {
  switch (action.type) {
    case "GET_VENDORS":
      console.log("STATE IN VENDORS REDUCER:", state);
      console.log("RETURNING STATE IN VENDOR REDUCUERS", {
        ...state,
        ...action.vendors,
      });
      return { ...state, ...action.vendors };
    default:
      return state;
  }
};

export const getVendors = (state) => {
  return state.vendors;
};

export default vendors;
