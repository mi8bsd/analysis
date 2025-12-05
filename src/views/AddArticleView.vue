<template>
  <div class="AddArticle">
    <div v-if="error" class="alert alert-danger">
      Something went wrong
    </div>
    <ArticleForm @submit="doAdd" form-title="Add New Article" centered/>
  </div>
</template>

<script>
import ArticleForm from "@/components/ArticleForm.vue";
import axios from "axios";

export default {
  name: 'AddArticle',
  components: {
    ArticleForm
  },
  data() {
    return {
      error: false
    }
  },
  methods: {
    doAdd(title, description, content) {
      let obj = {
        title: title,
        slug: title.replaceAll(" ", "-").toLowerCase(),
        description: description,
        content: content
      }

      axios
          .post("article/", obj)
          .then(_ => {
            this.error = false
            this.$router.push({name: "article", params: {"slug": obj.slug}})
          })
          .catch(err => {
            console.log(err)
            this.error = true
          })

    }
  }
}
</script>