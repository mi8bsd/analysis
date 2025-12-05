<template>
  <div class="Logout">
    <h1>Logout Page</h1>
    <div class="alert alert-danger" v-if="logoutError"> {{ logoutError }}</div>
    <button class="btn btn-danger" @click="doLogout">Logout</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      logoutError: null
    }
  },
  methods: {
    doLogout() {
      axios
          .post("auth/token/logout/",)
          .then(_ => {
            this.$store.commit("logout")
            this.$router.push({name: "login"})
            this.logoutError = null
          })
          .catch(error => {
            console.log(error.response.data)
            this.logoutError = error.response.data
          })
    }
  }
}
</script>