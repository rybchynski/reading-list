import { getBook, getBooks } from "@/services/book.service";

const state = () => ({
  book: {},
  books: [],
  fetchBookError: null,
});

const mutations = {
  setBook(state, book) {
    state.book = book;
  },
  setBooks(state, books) {
    state.books = books;
  },
  setFetchBookError(state, error) {
    state.fetchBookError = error;
  },
};

const actions = {
  async fetchBook({ commit }, id) {
    try {
      const book = await getBook(id);
      commit("setBook", book);
    } catch (err) {
      commit("setFetchBookError", err);
    }
  },

  async fetchBooks({ commit }) {
    try {
      const books = await getBooks();
      commit("setBooks", books);
    } catch (err) {
      commit("setFetchBookError", err);
    }
  },
};

const getters = {
  book: ({ book }) => book,
  books: ({ books }) => books,
  fetchBookError: ({ fetchBookError }) => fetchBookError,
};

export default {
  mutations,
  actions,
  getters,
  state,
};
