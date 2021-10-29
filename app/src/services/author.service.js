import { request } from "./main.service";

const getAuthor = (id) => request({ url: `authors/${id}`, method: "get" });
const getAuthors = () => request({ url: `authors`, method: "get" });
const updateAuthor = (id, data) => request({ url: `authors/${id}`, method: 'put', data: data })
const createAuthor = (data) => request({ url: `authors/`, method: "post", data: data });
const deleteAuthor = (id) => request({ url: `authors/${id}`, method: "delete" })

export { getAuthor, getAuthors, updateAuthor, createAuthor, deleteAuthor };
