// import { auth, provider,storage } from "../firebase";
// import db from "../firebase";
// import {
//   SET_USER,
//   SET_LOADING_STATUS,
//   GET_ARTICLES,
// } from "../actions/actionType";

// export const setLoading = (status) =>({
//   type: SET_LOADING_STATUS,
//   status: status
// })

// export const getArticles = (payload) => ({
//   type: GET_ARTICLES,
//   payload: payload,
// });

// export function getUserAuth() {
//   return (dispatch) => {
//     auth.onAuthStateChanged(async (user) => {
//       if (user) {
//         dispatch(setUser(user));
//       }
//     });
//   };
// }

// export function signOutAPI() {
//   return (dispatch) => {
//     auth
//       .signOut()
//       .then(() => {
//         dispatch(setUser(null));
//       })
//       .catch((error) => {
//         alert(error.message);
//       });
//   };
// }

// export function postArticleAPI(payload) {
//   return (dispatch) => {
//     dispatch(setLoading(true));
//     if (payload.image != "") {
//       const upload = storage
//         .ref(`images/${payload.image.name}`)
//         .put(payload.image);

//       upload.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalButes) * 100;

//           console.log(`progress: ${progress}%`);
//           if (snapshot.state === "RUNNING") {
//             console.log(`progress: ${progress}%`);
//           }
//         },
//         (error) => console.log(error.code),
//         async () => {
//           const downloadURL = await upload.snapshot.ref.getDownloadURL();
//           db.collection("articles").add({
//             actor: {
//               email: payload.user.email,
//               title: payload.user.displayName,
//               date: payload.timestamp,
//               image: payload.user.photoURL,
//             },
//             video: "",
//             sharedImg: downloadURL,
//             comments: 0,
//             description: payload.description,
//           });
//           dispatch(setLoading(false));
//         }
//       );
//     } else if (payload.video) {
//       db.collection("articles").add({
//         actor: {
//           email: payload.user.email,
//           title: payload.user.displayName,
//           date: payload.timestamp,
//           image: payload.user.photoURL,
//         },
//         video: payload.video,
//         sharedImg: "",
//         comments: 0,
//         description: payload.description,
//       });
//       dispatch(setLoading(false));
//     } else if (payload.description) {
//       db.collection("articles").add({
//         actor: {
//           email: payload.user.email,
//           title: payload.user.displayName,
//           date: payload.timestamp,
//           image: payload.user.photoURL,
//         },
//         video: "",
//         sharedImg: "",
//         comments: 0,
//         description: payload.description,
//       });
//       dispatch(setLoading(false));
//     }
//   };
// }

// export function getArticlesAPI() {
//   return (dispatch) => {
//     let payload;

//     db.collection("articles")
//       .orderBy("actor.date", "desc")
//       .onSnapshot((snapshot) => {
//         payload = snapshot.docs.map((doc) => doc.data());
//         // console.log(payload);
//         dispatch(getArticles(payload));
//       });
//   };
// }

import { userConstants } from "./userConstantsTypes";
import { userService } from "../services/userServices";

export const userActions = {
  login,
  logout,
  //register,
  //getAll,
  //delete: _delete,
};

function login(email, password) {
  return (dispatch) => {
    dispatch(request({ email }));

    userService.login(email, password).then(
      (user) => {
        dispatch(success(user));
        console.log(user);
      },
      (error) => {
        dispatch(failure(error.toString()));
      }
    );
  };

  function request(user) {
    console.log("request", user);
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    console.log("success", user);
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
