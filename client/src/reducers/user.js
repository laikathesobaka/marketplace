const user = (state = {}, action) => {
  switch (action.type) {
    case "RECEIVE_USER":
      return action.user;
    case "REMOVE_USER":
      return { ...state, ...{ user: action.user } };
    case "UPDATE_USER_AUTH":
      console.log("STATE IN UPDATE USER AUTH", state);
      console.log("ACTION . AUTHRES in UPDATEUSER AUTH", action.authRes);
      return {
        ...state,
        ...action.authRes,
        authenticated: action.authRes.authenticated,
      };
    case "SHOW_ACCOUNT_SIDEBAR":
      console.log("STATUS INCOMING TO USER SIDE BAR", state, action.status);
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
