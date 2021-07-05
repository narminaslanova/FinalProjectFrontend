import { userConstants } from "./userConstantsTypes";
import { userService } from "../services/userServices";

export const userActions = {
  login,
  logout,
};

function login(email, password) {
  return (dispatch) => {
    userService
      .login(email, password).then(
        () => {
               dispatch(success());
          }
          
          
         // console.log("userActions", JSON.parse(localStorage.getItem("user")));
        
        //console.log(res)}
      );
    // userService.login(email, password).then(
    //   ({   data   }) => {
    //     dispatch(success(data)).then();
       
    //   },
    //   (error) => {
    //     dispatch(failure(error.toString()));
    //   }
    // );
  };

  // function request(user) {
  //   console.log("request", user);
  //   return { type: userConstants.LOGIN_REQUEST, user };
  // }
  function success() {
    let user = JSON.parse(localStorage.getItem("user"));
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

// function register(user) {
//   return (dispatch) => {
//     dispatch(request(user));

//     userService.register(user).then(
//       (user) => {
//         dispatch(success());
//         history.push("/login");
//         dispatch(alertActions.success("Registration successful"));
//       },
//       (error) => {
//         dispatch(failure(error.toString()));
//         dispatch(alertActions.error(error.toString()));
//       }
//     );
//   };

//   function request(user) {
//     return { type: userConstants.REGISTER_REQUEST, user };
//   }
//   function success(user) {
//     return { type: userConstants.REGISTER_SUCCESS, user };
//   }
//   function failure(error) {
//     return { type: userConstants.REGISTER_FAILURE, error };
//   }
// }

// function getAll() {
//   return (dispatch) => {
//     dispatch(request());

//     userService.getAll().then(
//       (users) => dispatch(success(users)),
//       (error) => dispatch(failure(error.toString()))
//     );
//   };

//   function request() {
//     return { type: userConstants.GETALL_REQUEST };
//   }
//   function success(users) {
//     return { type: userConstants.GETALL_SUCCESS, users };
//   }
//   function failure(error) {
//     return { type: userConstants.GETALL_FAILURE, error };
//   }
// }

// prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//   return (dispatch) => {
//     dispatch(request(id));

//     userService.delete(id).then(
//       (user) => dispatch(success(id)),
//       (error) => dispatch(failure(id, error.toString()))
//     );
//   };

//   function request(id) {
//     return { type: userConstants.DELETE_REQUEST, id };
//   }
//   function success(id) {
//     return { type: userConstants.DELETE_SUCCESS, id };
//   }
//   function failure(id, error) {
//     return { type: userConstants.DELETE_FAILURE, id, error };
//   }
// }
