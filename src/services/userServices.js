import axios from "axios";

export const userService = {
  login,
  logout,
};

function login(email, password) {
  return axios.post("https://localhost:44331/api/Authenticate/login", {
    email,

    password,
  });
  // .then((res) => {
  //   localStorage.setItem("user", JSON.stringify(res.data));
  // });
}

function logout() {
  localStorage.removeItem("user");
}

// function getAll() {
//   const requestOptions = {
//     method: "GET",
//     headers: authHeader(),
//   };

//   return fetch(
//     "https://localhost:44331/api/Authenticate/GetAllUsers",
//     requestOptions
//   ).then(handleResponse);
// }

// function getById(id) {
//   const requestOptions = {
//     method: "GET",
//     headers: authHeader(),
//   };

//   return fetch(
//     `"https://localhost:44331/api/Authenticate/GetUserAsync/${id}`,
//     requestOptions
//   ).then(handleResponse);
// }

// function register(user) {
//   const requestOptions = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(user),
//   };

//   return fetch(`${config.apiUrl}/users/register`, requestOptions).then(
//     handleResponse
//   );
// }

// function update(user) {
//   const requestOptions = {
//     method: "PUT",
//     headers: { ...authHeader(), "Content-Type": "application/json" },
//     body: JSON.stringify(user),
//   };

//   return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(
//     handleResponse
//   );
// }

// prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//   const requestOptions = {
//     method: "DELETE",
//     headers: authHeader(),
//   };

//   return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(
//     handleResponse
//   );
// }

// function handleResponse(response) {
//   console.log("handle", response);
//   return response.text().then((text) => {
//     const data = text && JSON.parse(text);
//     if (!response.ok) {
//       if (response.status === 401) {
//         // auto logout if 401 response returned from api
//         logout();
//         // location.reload(true);
//       }

//       const error = (data && data.message) || response.statusText;
//       return Promise.reject(error);
//     }

//     return data;
//   });
