import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import author from "./author";
import book from "./book";
import category from "./category";
import user from "./user";

Vue.use(Vuex);

const vuexLS = new VuexPersist({
  key: "vuex",
  storage: window.localStorage,
  reducer: (state) => ({ isAuth: state.user.isAuth }),
});

export default new Vuex.Store({
  modules: {
    author,
    book,
    category,
    user,
  },
  plugins: [vuexLS.plugin],
});
