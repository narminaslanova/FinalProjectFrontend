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
}

function logout() {
  localStorage.removeItem("user");
}
