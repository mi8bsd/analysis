<template>
  <div class="home">
    <h1 class="text-center">Home Page</h1>

    <form class="d-flex mb-3 mt-4" role="search" @submit.prevent="search">
      <input class="form-control" type="search" placeholder="Search" aria-label="Search" v-model="searchQuery">
      <button class="btn btn-outline-light btn-primary ms-3" type="submit">Search</button>
    </form>

    <hr/>

    <article v-for="article in articles">
      <h3 class="fw-bold">{{ article.title }}</h3>
      <div>{{ article.description }}</div>
      <router-link :to="{name: 'article', params: {'slug': article.slug}}">More ...</router-link>
      <hr/>
    </article>

    <h2 v-if="!articles.length && !error" class="text-center">There is no Article ...</h2>
    <h2 v-if="error" class="text-center">Cannot load articles ...</h2>
  </div>
</template>

<script>
// @ is an alias to /src

import axios from "axios";

export default {
  name: 'HomeView',
  data() {
    return {
      articles: [],
      error: false,
      searchQuery: ""
    }
  },
  methods: {
    getArticles(query = null) {
      let q = query !== null ? `article/?search=${query}` : "article/"

      axios
          .get(q)
          .then(response => {
            this.articles = response.data
            this.error = false
          })
          .catch(_ => {
            this.articles = []
            this.error = true
          })
    },
    search() {
      this.getArticles(
          (!this.searchQuery || this.searchQuery.length === 0) ? null : this.searchQuery
      )
    }
  },
  mounted() {
    this.getArticles();
  }
}
</script>
