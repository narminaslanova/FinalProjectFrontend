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
      .then((response) => {
        console.log("action", response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .then(() => {
        dispatch(success());
      })
      .catch((err) => {
        dispatch(failure());
      });
  };

  function success() {
    let user = JSON.parse(localStorage.getItem("user"));
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure() {
    let user = JSON.parse(localStorage.getItem("user"));
    return { type: userConstants.LOGIN_FAILURE, user };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}
