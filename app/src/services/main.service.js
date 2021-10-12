import axios from "axios";

const API_URL = process.env.VUE_APP_API_URL;

export const request = async ({ url, method, data = {} }) => {
  const response = await axios[method](`${API_URL}/${url}`, data);
  return response.data;
};
