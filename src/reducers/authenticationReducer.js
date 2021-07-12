import { userConstants } from "../actions/userConstantsTypes";

let user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  loggedIn: false,
  user: user ? user : [],
};

const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    // case userConstants.LOGIN_REQUEST:
    //   return {
    //     ...state,
    //     loggingIn: true,
    //     user: action.user,
    //   };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return { initialState };
    default:
      return state;
  }
};
export default authenticationReducer;
