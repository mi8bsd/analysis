<template>
  <div class="Article">
    <div v-if="loading" class="text-center">
      <div class="spinner-grow text-primary mt-5" role="status">
      </div>
    </div>
    <div v-else>
      <div v-if="!notFound">
        <article>
          <h1 class="fw-bold">{{ article.title }}</h1>
          <div>{{ article.content }}</div>
        </article>
        <div v-if="$store.state.isAuthenticated">
          <hr/>
          <button
              class="btn btn-outline-secondary px-4"
              @click="toggleEdit">Edit
          </button>
          <button
              class="btn btn-outline-danger px-4 mx-3"
              @click="deleting = !deleting">Delete
          </button>

          <Transition name="fade">
            <div v-if="deleting" class="mt-3">
              <hr/>
              <div class="alert alert-danger" v-if="deletingError">Something went wrong</div>
              <h3>Are You Sure you want to delete this article?</h3>
              <button
                  class="btn btn-outline-danger px-4"
                  @click="doRemove">Yes
              </button>
              <button
                  class="btn btn-outline-secondary px-4 mx-3"
                  @click="deleting = false">No
              </button>
            </div>
          </Transition>

          <Transition name="fade">
            <div v-if="editing">
              <hr class="my-3"/>
              <div class="alert alert-danger" v-if="editingError">Something went wrong</div>
              <ArticleForm form-title="Edit Article" :article="article" @submit="doEdit"/>
            </div>
          </Transition>
        </div>
      </div>
      <div v-else>
        <h1>Article was not found ...</h1>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleForm from "@/components/ArticleForm.vue";
import axios from "axios";

export default {
  name: 'Article',
  components: {ArticleForm},
  data() {
    return {
      article: {},
      editing: false,
      editingError: false,
      deleting: false,
      deletingError: false,
      notFound: true,
      loading: true,
    }
  },
  mounted() {
    axios
        .get(`article/${this.$route.params.slug}/`,)
        .then(response => {
          this.article = response.data
          this.notFound = false
        })
        .catch(_ => {
          this.article = {}
          this.notFound = true
        })
    this.loading = false
  },
  methods: {
    doEdit(title, description, content) {
      let obj = {
        title: title,
        slug: title.replaceAll(" ", "-").toLowerCase(),
        description: description,
        content: content
      }

      axios
          .put(`article/${this.article.slug}/`, obj)
          .then(_ => {
            this.article = obj
            this.editing = false
            this.editingError = false
            this.$router.push({name: "article", params: {"slug": obj.slug}})
          })
          .catch(err => {
            console.log(err)
            this.editingError = true
          })
    },
    toggleEdit() {
      this.editing = !this.editing
      if (this.editing === false)
        this.editingError = false
    },
    doRemove() {
      axios
          .delete(`article/${this.article.slug}/`)
          .then(_ => {
            this.$router.push({name: "home"})
          })
          .catch(err => {
            console.log(err)
            this.deletingError = true
          })
    },
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>