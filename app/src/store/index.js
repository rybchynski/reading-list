import Vue from "vue";
import Vuex from "vuex";
import author from "./author";
import book from "./book";
import category from "./category";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    author,
    book,
    category,
  },
});
