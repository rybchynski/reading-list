import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

const $axios = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

// output interceptor.
$axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

  return config;
});

// input interceptor.
$axios.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(`${API_URL}users/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return $axios.request(originalRequest);
      } catch (error) {
        console.log("Not authorized");
      }
    }
    throw error;
  }
);

export const request = async ({ url, method, data = {} }) => {
  const response = await $axios[method](`${url}`, data);

  return response.data;
};
