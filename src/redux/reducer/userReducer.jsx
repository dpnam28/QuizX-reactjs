import actionTypes from "../actions/actionTypes";

const INITAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    image: "",
    role: "",
  },
  isAuthenticated: false,
};

const userReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          access_token: action?.payload?.DT?.access_token ?? "",
          refresh_token: action?.payload?.DT?.refresh_token ?? "",
          username: action?.payload?.DT?.username ?? "",
          image: action?.payload?.DT?.image ?? "",
          role: action?.payload?.DT?.role ?? "",
        },
        isAuthenticated: true,
      };

    default:
      return state;
  }
};

export default userReducer;
