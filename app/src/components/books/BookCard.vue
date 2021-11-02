<template>
  <router-link
    :to="`/books/${book._id}`"
    custom
    v-slot="{ href, navigate, isActive }"
    exact
  >
    <a
      class="book-card"
      :href="href"
      @click="navigate"
      :class="isActive ? 'active' : null"
    >
      <div class="book-card__image">
        <img :src="book.cover" :alt="book.title" />
      </div>
      <div class="book-card__meta">
        <h5 class="book-card__meta-title">{{ book.title }}</h5>
        <span class="book-card__meta-rating">
          <star-rating
            :read-only="true"
            :show-rating="false"
            :rating="book.rating"
            :star-size="20"
          />
        </span>
        <span class="book-card__meta-author">{{ book.author.name }}</span
        ><br />
        <span
          class="book-card__meta-status"
          :class="book.status === 'Finished' ? 'done' : null"
          >{{ book.status }}</span
        ><br />
        <span class="book-card__meta-type">{{ book.type }}</span
        ><br />
        <span class="book-card__meta-pages">Pages -- {{ book.pages }} p.</span
        ><br />
      </div>
    </a>
  </router-link>
</template>

<script>
  import StarRating from "vue-star-rating";

  export default {
    components: {
      StarRating,
    },
    props: {
      book: {
        type: Object,
        default: () => {},
      },
    },
  };
</script>

<style lang="scss" scoped>
  .book-card {
    border: solid 2px black;
    padding: 10px;
    border-radius: 15px;
    display: flex;
    text-decoration: none;
    color: black;
    transition: box-shadow 0.3s ease;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }

    &__image {
      margin-right: 20px;
      img {
        height: 180px;
        object-fit: cover;
        border: solid 1px black;
        border-radius: 15px;
        padding: 5px;
      }
    }

    &__meta {
      &-author {
        color: gray;
        text-transform: uppercase;
        font-size: 14px;
      }

      .done {
        background-color: #78f778;
        padding: 5px 10px;
      }
    }
  }
</style>
