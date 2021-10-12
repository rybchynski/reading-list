import { request } from "./main.service";

const getAuthor = (id) => request({ url: `authors/${id}`, method: "get" });
const getAuthors = () => request({ url: `authors`, method: "get" });

export { getAuthor, getAuthors };
