import { request } from "./main.service";

const getAuthor = (id) => request({ url: `authors/${id}`, method: "get" });
const getAuthors = () => request({ url: `authors`, method: "get" });
const updateAuthor = (id) => request({ url: `authors/${id}`, method: 'put' })
const createAuthor = () => request({ url: `authors`, method: "post" })

export { getAuthor, getAuthors, updateAuthor, createAuthor };
