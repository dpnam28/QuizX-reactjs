import actionTypes from "./actionTypes";

export const commitLogin = (data) => {
  return {
    type: actionTypes.FETCH_USER_LOGIN_SUCCESS,
    payload: data,
  };
};
export const commitLogOut = () => {
  return {
    type: actionTypes.LOG_OUT,
  };
};
export const commitChangeLanguage = (language) => {
  return {
    type: actionTypes.CHANGE_LANGUAGE,
    payload: language,
  };
};
