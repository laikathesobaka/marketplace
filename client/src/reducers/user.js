const user = (state = {}, action) => {
  switch (action.type) {
    case "RECEIVE_USER":
      return action.user;
    case "REMOVE_USER":
      return { ...state, ...{ user: action.user } };
    case "UPDATE_USER_AUTH":
      return {
        ...state,
        ...action.authRes,
        authenticated: action.authRes.authenticated,
      };
    case "SHOW_ACCOUNT_SIDEBAR":
      return { ...state, showSidebar: action.status };
    default:
      return state;
  }
};

export const getUser = (state) => {
  return state.user;
};

export const getUserAuthStatus = (state) => {
  return state.user.authenticated;
};

export const getAccountSidebarStatus = (state) => {
  return state.user.showSidebar;
};

export default user;
