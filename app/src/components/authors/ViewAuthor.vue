<template>
  <div class="author-view-page" v-if="authorError">
    <p class="error">{{ authorError.err }}</p>
  </div>
  <div class="author-view-page" v-else>
    <h3 class="center-align page_title">{{ author.name }}</h3>
    <div class="row">
      <div class="col s12 actions">
        <Button
          v-if="author.link"
          class="rounded"
          @click="onMoreInfo"
          buttonText="More info"
          buttonSize="small"
        />
        <Button
          v-for="({ className, label, emit, type }, index) in actions"
          :key="index"
          :class="className"
          @click="emit"
          :buttonText="label"
          :buttonType="type"
          buttonSize="small"
        />
      </div>
    </div>
    <div class="row">
      <div class="col s12 author__biography">
        {{ author.bio }}
      </div>
    </div>
    <FloatingButton @onClick="handleCancel" icon="arrow_back" />
  </div>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  import FloatingButton from "@/components/ui/FloatingButton.vue";
  import Button from "@/components/ui/Button.vue";
  export default {
    components: {
      FloatingButton,
      Button,
    },
    data() {
      return {
        actions: [
          {
            className: "rounded",
            label: "Edit",
            emit: this.onEdit,
          },
          {
            className: "rounded",
            label: "Delete",
            type: "danger",
            emit: this.onDelete,
          },
        ],
      };
    },
    computed: { ...mapGetters(["author", "authorError"]) },
    methods: {
      ...mapActions({
        fetchAuthor: "fetchAuthor",
        deleteAuthor: "deleteAuthor",
      }),
      handleCancel() {
        this.$router.back();
      },
      onEdit() {
        this.$router.push(`/authors/${this.author._id}/edit`);
      },
      onMoreInfo() {
        window.open(this.author.link, "_blank");
      },
      onDelete() {
        this.$confirm({
          title: "Warning",
          message: `Are you sure you want to delete <span class="confirm-item-name">"${this.author.name}"</span> author?`,
          confirm: "Sure",
          cancel: "No way",
        }).then((res) => {
          if (res) {
            this.deleteAuthor(this.author._id);
            this.$router.back();
            this.$info(`Author "${this.author.name}" was deleted.`);
          }
        });
      },
    },
    async mounted() {
      await this.fetchAuthor(this.$route.params.id);
    },
  };
</script>

<style lang="scss" scoped>
  .actions {
    margin: 40px auto;
  }

  .author__biography {
    font-size: 18px;
    text-align: justify;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 5px;
  }

  .error {
    color: red;
    border: 1px solid red;
    padding: 10px;
  }
</style>
