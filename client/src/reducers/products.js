const initialState = {
  garlic: {
    unitCost: 10,
    media: "/garlic2.png",
    name: "garlic",
  },
  onion: {
    unitCost: 5,
    media: "/onion.png",
    name: "onion",
  },
  potato: {
    unitCost: 3,
    media: "/potato.png",
    name: "potato",
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
