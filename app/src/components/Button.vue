<template>
  <button
    class="button"
    :class="buttonClassName ? 'button-' + buttonClassName : null"
  >
    <i class="material-icons" v-if="buttonIcon">{{ buttonIcon }}</i>
    {{ buttonText }}
  </button>
</template>

<script>
  export default {
    props: {
      buttonClassName: {
        type: String,
        default: "button-primary",
      },
      buttonIcon: {
        type: String,
        default: "",
      },
      buttonText: {
        type: String,
        default: "",
      },
    },
  };
</script>

<style lang="scss" scoped>
  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    padding: 10px 20px;
    border: 2px solid $bunting-border-color;
    border-radius: 20px;
    cursor: pointer;

    &-primary {
      background-color: $deep-sky-blue;
    }

    &-secondary {
      background-color: $sunglow;
      color: black;
    }

    &-danger {
      background-color: $coral;
    }

    i {
      margin-right: 10px;
    }
  }
</style>
