import actionTypes from "../actions/actionTypes";

const INITAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    image: "",
    role: "",
    email: "",
  },
  isAuthenticated: false,
  language: "en",
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
          email: action?.payload?.DT?.email ?? "",
        },
        isAuthenticated: true,
        language: "en",
      };
    case actionTypes.LOG_OUT:
      return {
        account: {
          access_token: "",
          refresh_token: "",
          username: "",
          image: "",
          role: "",
          email: "",
        },
        isAuthenticated: false,
        language: "en",
      };
    case actionTypes.CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
