import { getAuthor, getAuthors } from "@/services/author.service";

const state = () => ({
  author: {},
  authors: [],
  fetchAuthorError: null,
});

const mutations = {
  setAuthor(state, author) {
    state.author = author;
  },
  setAuthors(state, authors) {
    state.authors = authors;
  },
  setFetchAuthorError(state, error) {
    state.fetchAuthorError = error;
  },
};

const actions = {
  async fetchAuthor({ commit }, id) {
    try {
      const author = await getAuthor(id);
      commit("setAuthor", author);
    } catch (err) {
      commit("setFetchAuthorError", err);
    }
  },

  async fetchAuthors({ commit }) {
    try {
      const authors = await getAuthors();
      commit("setAuthors", authors);
    } catch (err) {
      commit("setFetchAuthorError", err);
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
