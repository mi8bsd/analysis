<template>
  <Navbar/>
  <router-view class="container"/>
</template>

<script>
import Navbar from "@/components/Navbar.vue";

export default {
  name: 'Home',
  components: {
    Navbar
  },
  watch: {
    $route() {
      this.$store.dispatch("onStart")
    }
  },
  mounted() {
    this.$store.dispatch("onStart")
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
