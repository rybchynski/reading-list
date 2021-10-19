<template>
  <button
    class="btn button"
    :disabled="disabled"
    :class="[
      buttonType ? 'button-' + buttonType : null,
      buttonSize ? 'button-' + buttonSize : null,
      buttonClassNames,
    ]"
    @click="$emit('click')"
  >
    <i class="material-icons" v-if="buttonIcon">{{ buttonIcon }}</i>
    {{ buttonText }}
  </button>
</template>

<script>
  export default {
    props: {
      buttonClassNames: {
        type: String,
        default: "",
      },
      buttonType: {
        type: String,
        default: "primary",
      },
      buttonIcon: {
        type: String,
        default: "",
      },
      buttonText: {
        type: String,
        default: "",
      },
      buttonSize: {
        type: String,
        default: "medium",
      },
      disabled: {
        type: Boolean,
        default: false,
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
    cursor: pointer;
    margin-bottom: 1px;

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

    &-medium {
      padding: 10px 20px;
    }

    &-small {
      border: solid $bunting-border-color 1px;
      padding: 5px 10px;
      font-size: 0.8rem;
    }

    &.rounded {
      border-radius: 20px;
    }

    i {
      margin-right: 10px;
    }

    &:hover {
      border: solid $bunting-border-color 1px;
      padding: 11px 21px;
    }
  }

  .button-small {
    &:hover {
      border: solid $bunting-border-color 2px;
      padding: 4px 9px;
    }
  }
</style>
