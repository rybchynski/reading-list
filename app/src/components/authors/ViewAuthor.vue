<template>
  <div class="view-author-page">
    <h2 class="title">View Author</h2>
    <p>Id is {{ this.$route.params.id }}</p>
    <pre>{{ author }}</pre>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default{
    computed: {...mapGetters(['author'])},
    methods: {
      ...mapActions({fetchAuthor: "fetchAuthor"}),
    },
    mounted() {
      this.fetchAuthor(this.$route.params.id)
    }
  }
</script>

