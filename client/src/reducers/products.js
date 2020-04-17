const initialState = {
  garlic: {
    unitCost: 10,
    media: "/garlic3.jpg",
  },
  onion: {
    unitCost: 5,
    media: "/onion.png",
  },
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PURCHASE_ITEMS":
      return { ...state };

    default:
      return state;
  }
};

export const getProducts = (state) => {
  return state.products;
};

export default products;
