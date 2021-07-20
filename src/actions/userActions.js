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
        localStorage.setItem("user", JSON.stringify(response.data));
      })
      .then(() => {
        dispatch(success());
      })
      .catch((error) => {
        if (error.message == "Request failed with status code 401") {
          return error.message;
        }
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
