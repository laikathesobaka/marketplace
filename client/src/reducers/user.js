const initialState = {};
const user = (state = initialState, action) => {
  switch (action.type) {
    case "RECEIVE_USER":
      return action.user;
    case "REMOVE_USER":
      return { ...state, ...{ user: action.user } };
    default:
      return state;
  }
};

export const getUser = (state) => {
  return state.user;
};

export default user;
