import { authHeader } from "../helpers/authHeader";

export const userService = {
  login,
  logout,
  //   register,
  //getAll,
  //getById,
  //   update,
  //   delete: _delete,
};

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

  return fetch("https://localhost:44331/api/Authenticate/login", requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
      console.log("retrieved data Object: ", JSON.parse(user));
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
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

function handleResponse(response) {
  console.log("handle", response);
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
        // location.reload(true);
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
