const user = (state = {}, action) => {
  switch (action.type) {
    case "RECEIVE_USER":
      return { ...action.user };
    case "REMOVE_USER":
      return {};
    default:
      return {};
  }
};

export default user;
