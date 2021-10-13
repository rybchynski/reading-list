import { createStore } from "vuex";
import author from "./author";
import book from "./book";
import category from "./category";

export default createStore({
  modules: {
    author,
    book,
    category,
  },
});
