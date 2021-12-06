<template>
  <div>
      <transition-group name="book-list" class="books">
        <div class="book-card-view" v-for="(book, id) in books" :key="id">
          <BookCard :book="book" />
        </div>
      </transition-group>
  </div>
</template>

<script>
  import BookCard from "@/components/books/BookCard.vue";

  export default {
    components: {
      BookCard,
    },
    props: {
      books: {
        type: Array,
        defalut: () => [],
      },
    },
  };
</script>

<style lang="scss" scoped>
  @import "materialize-css";

  .books {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    // grid-template-rows: repeat(4, 1fr);
    grid-column-gap: 10px;
    grid-row-gap: 10px;
  }

  @media #{$medium-and-down} {
    .books {
      grid-template-columns: 1fr;
    }
  }

  .book-list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .book-list-enter-active,
  .book-list-leave-active {
    transition: all .2s ease;
  }
  .book-list-enter-from,
  .book-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
  }
  .book-list-move {
    transition: transform 0.4s ease;
  }
</style>
