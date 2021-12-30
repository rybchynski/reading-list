import {
  getCategory,
  getCategories,
  updateCategory,
  createCategory,
  deleteCategory,
} from "@/services/category.service";

const state = () => ({
  category: {},
  categories: [],
  categoryError: null,
});

const mutations = {
  setCategory(state, category) {
    state.category = category;
  },
  setCategories(state, categories) {
    state.categories = categories;
  },
  setCategoryError(state, error) {
    state.categoryError = error;
  },
  updateCategorySuccess(state, category) {
    state.category = category;
  },
  createCategorySuccess(state, category) {
    state.category = category;
  },
  deleteCategorySuccess(state, category) {
    state.category = category;
  },
};

const actions = {
  async fetchCategory({ commit }, id) {
    try {
      const category = await getCategory(id);
      commit("setCategory", category);
    } catch (err) {
      commit("setCategoryError", {
        errorType: "fetch category failed",
        err,
      });
    }
  },

  async fetchCategories({ commit }) {
    try {
      const categories = await getCategories();
      commit("setCategories", categories);
    } catch (err) {
      commit("setCategoryError", {
        errorType: "fetch categories failed",
        err,
      });
    }
  },

  async updateCategory({ commit }, { id, data }) {
    try {
      const category = await updateCategory(id, data);
      commit("updateCategorySuccess", category);
    } catch (err) {
      commit("setCategoryError", {
        errorType: "update category failed",
        err,
      });
    }
  },

  async createCategory({ commit }, { data }) {
    try {
      const category = await createCategory(data);
      commit("createCategorySuccess", category);
    } catch (err) {
      commit("setCategoryError", {
        errorType: "create category failed",
        err,
      });
    }
  },

  async deleteCategory({ commit }, id) {
    try {
      const category = await deleteCategory(id);
      const categories = await getCategories();
      commit("deleteCategorySuccess", category);
      commit("setCategories", categories);
    } catch (err) {
      commit("setCategoryError", {
        errorType: "category delete failed",
        err,
      });
    }
  },
};

const getters = {
  category: ({ category }) => category,
  categories: ({ categories }) => categories,
  categoryError: ({ categoryError }) => categoryError,
};

export default {
  mutations,
  actions,
  getters,
  state,
};
