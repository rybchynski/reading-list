<template>
  <div class="list-page-wrapper">
    <h3 class="center page_title">{{ `${names} list is empty` }}</h3>
  </div>
</template>

<script>
  export default {
    props: {
      names: {
        type: String,
        default: "Items",
      },
    },
  };
</script>
