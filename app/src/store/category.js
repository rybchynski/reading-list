import { getCategory, getCategories } from "@/services/category.service";

const state = () => ({
  category: {},
  categories: [],
  fetchCategoryError: null,
});

const mutations = {
  setCategory(state, category) {
    state.category = category;
  },
  setCategories(state, categories) {
    state.categories = categories;
  },
  setFetchCategoryError(state, error) {
    state.fetchCategoryError = error;
  },
};

const actions = {
  async fetchCategory({ commit }, id) {
    try {
      const category = await getCategory(id);
      commit("setCategory", category);
    } catch (err) {
      commit("setFetchCategoryError", err);
    }
  },

  async fetchCategories({ commit }) {
    try {
      const categories = await getCategories();
      commit("setCategories", categories);
    } catch (err) {
      commit("setFetchCategoryError", err);
    }
  },
};

const getters = {
  category: ({ category }) => category,
  categories: ({ categories }) => categories,
  fetchCategoryError: ({ fetchCategoryError }) => fetchCategoryError,
};

export default {
  mutations,
  actions,
  getters,
  state,
};
