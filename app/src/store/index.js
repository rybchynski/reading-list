import { createStore } from "vuex";
import author from "./author";
import book from "./book";

export default createStore({
  modules: {
    author,
    book,
  },
});
