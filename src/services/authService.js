import httpService from "./httpService";

export function login(email, password) {
  return httpService.post("/api/users/login", { email, password });
}

export function getJwt() {
  return localStorage.getItem("token");
}

export default {
  login,
  getJwt,
};
