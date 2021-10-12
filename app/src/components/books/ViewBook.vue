<template>
  <div>
    <h2>Single book</h2>
    <p>Id is {{ this.$route.params.id }}</p>
    <pre>{{ book }}</pre>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";

  export default {
    computed: { ...mapGetters(["book"]) },
    methods: {
      ...mapActions({ fetchBook: "fetchBook" }),
    },
    mounted() {
      this.fetchBook(this.$route.params.id);
    },
  };
</script>

<style lang="scss" scoped></style>
