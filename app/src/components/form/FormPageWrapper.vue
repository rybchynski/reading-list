<template>
  <div class="form-wrapper">
    <div class="center">
      <h2 class="page_title">{{ title }}</h2>
    </div>
    <div class="center page_description" v-if="description">
      {{ description }}
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
};
</script>

<style lang="scss" scoped>
.form-wrapper {
  margin-top: 80px;
}
</style>
