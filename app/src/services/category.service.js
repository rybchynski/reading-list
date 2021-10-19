import { request } from "./main.service";

const getCategories = () => request({ url: `categories`, method: "get" });
const getCategory = (id) => request({ url: `categories/${id}`, method: "get" });
const updateCategory = (id, data) =>
  request({ url: `categories/${id}`, method: "put", data: data });
const createCategory = (data) =>
  request({ url: `categories/`, method: "post", data: data });
const deleteCategory = (id) =>
  request({ url: `categories/${id}`, method: "delete" });

export {
  getCategory,
  updateCategory,
  getCategories,
  createCategory,
  deleteCategory,
};
