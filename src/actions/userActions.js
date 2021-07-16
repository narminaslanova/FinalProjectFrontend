import { userConstants } from "./userConstantsTypes";
import { userService } from "../services/userServices";

export const userActions = {
  login,
  logout,
};

function login(email, password) {
  return (dispatch) => {
    userService
      .login(email, password)
      .then(({ data }) => {
        localStorage.setItem("user", JSON.stringify(data));
      })
      .then(() => {
        dispatch(success());
      });
  };

  function success() {
    let user = JSON.parse(localStorage.getItem("user"));
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}
