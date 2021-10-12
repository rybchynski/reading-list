import { request } from "./main.service";

const getBook = (id) => request({ url: `books/${id}`, method: "get" });
const getBooks = () => request({ url: `books`, method: "get" });

export { getBook, getBooks };
