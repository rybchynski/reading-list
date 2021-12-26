import { request } from "./main.service";

const registration = (data) => {
  return request({ url: `users/registration`, method: "post", data: data });
};

const login = (data) =>
  request({ url: `users/login`, method: "post", data: data });
const logout = () => request({ url: `users/logout`, method: "get" });
const refresh = () => request({ url: `users/refresh`, method: "get" });
const getUsers = () => request({ url: `users/`, method: "get" });

export { registration, login, logout, refresh, getUsers };
