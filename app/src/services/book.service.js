import { request } from "./main.service";

const getBook = (id) => request({ url: `books/${id}`, method: "get" });
const getBooks = () => request({ url: `books`, method: "get" });
const updateBook = (id, data) =>
  request({ url: `books/${id}`, method: "put", data: data });
const createBook = (data) =>
  request({ url: `books/`, method: "post", data: data });
const deleteBook = (id) => request({ url: `books/${id}`, method: "delete" });

export { getBook, getBooks, updateBook, createBook, deleteBook };
