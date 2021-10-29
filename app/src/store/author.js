import { getAuthor, getAuthors, createAuthor, updateAuthor, deleteAuthor } from "@/services/author.service";

const state = () => ({
  author: {},
  authors: [],
  authorError: null,
});

const mutations = {
  setAuthor(state, author) {
    state.author = author;
  },
  setAuthors(state, authors) {
    state.authors = authors;
  },
  setAuthorError(state, error) {
    state.authorError = error;
  },
  createAuthorSuccess(state, author) {
    state.author = author
  },
  updateAuthorSuccess(state, author) {
    state.author = author
  },
  deleteAuthorSuccess(state, author) {
    state.author = author
  }
};

const actions = {
  async fetchAuthor({ commit }, id) {
    try {
      const author = await getAuthor(id);
      commit("setAuthor", author);
    } catch (err) {
      commit("setAuthorError", {
        errType: 'fetch author error',
        err
      });
    }
  },

  async fetchAuthors({ commit }) {
    try {
      const authors = await getAuthors();
      commit("setAuthors", authors);
    } catch (err) {
      commit("setAuthorError", {
        errType: 'fetch authors error',
        err
      });
    }
  },
  async createAuthor({ commit }, { data }) {
    try {
      const author = await createAuthor(data)
      commit("createAuthorSuccess", author)
    } catch (err) {
      commit('setAuthorError', {
        errType: 'create author error',
        err
      })
    }
  },

  async updateAuthor({ commit }, { id, data }) {
    try {
      const author = await updateAuthor(id, data)
      commit("updateAuthorSuccess", author)
    } catch (err) {
      commit("setAuthorError", {
        errType: 'update author error',
        err
      })
    }
  },

  async deleteAuthor({ commit }, id) {
    try {
      const author = await deleteAuthor(id);
      commit("deleteAuthorSuccess", author);
    } catch (err) {
      commit("setAuthorError", {
        errorType: "author delete failed",
        err,
      });
    }
  },
};

const getters = {
  author: ({ author }) => author,
  authors: ({ authors }) => authors,
  fetchAuthorError: ({ fetchAuthorError }) => fetchAuthorError,
};

export default {
  mutations,
  actions,
  getters,
  state,
};
