<template>
  <div>
    <a
      @click="$emit('onClick')"
      class="btn-floating btn-large waves-effect waves-light"
      ><i class="material-icons">{{ icon }}</i></a
    >
  </div>
</template>

<script>
  export default {
    props: {
      icon: {
        type: String,
        default: "",
      },
    },
  };
</script>

<style lang="scss" scoped>
  a {
    background-color: $deep-sky-blue;
    position: fixed;
    bottom: 5%;
    right: 5%;
  }
</style>
