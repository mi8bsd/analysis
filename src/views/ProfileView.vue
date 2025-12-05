<template>
  <div class="Profile">
    <div class="col-md-6 col-lg-4 col-sm-10 mx-auto border shadow rounded-4 p-4 mt-3">
      <h1 class="text-center">Profile | {{ username }}</h1>

      <hr/>

      <ul class="nav nav-pills nav-fill mb-4">
        <li class="nav-item">
          <a
              class="nav-link"
              :class="{'active': infoActive}"
              href="#"
              @click="infoActive = true"
          >Email</a>
        </li>

        <li class="nav-item">
          <a
              class="nav-link"
              :class="{'active': !infoActive}"
              href="#"
              @click="infoActive = false"
          >Password</a>
        </li>
      </ul>

      <Transition name="fade">
        <div v-if="infoActive">
          <form @submit.prevent="updateEmail">
            <div class="form-group mb-4">
              <input
                  type="email"
                  class="form-control p-2"
                  placeholder="Email"
                  aria-label="Email"
                  v-model="email">
            </div>

            <button class="btn btn-primary col-12 p-2 fw-bold" type="submit">Update</button>
          </form>
        </div>
      </Transition>
      <Transition name="fade">
        <div v-if="!infoActive">
          Change Password
        </div>
      </Transition>

    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'Profile',
  data() {
    return {
      username: '',
      infoActive: true,
      email: '',
    }
  },
  mounted() {
    axios
        .get("auth/users/me/",)
        .then(response => {
          this.username = response.data.username
          this.email = response.data.email
        })
        .catch(error => {
          console.log(error.response.data.detail)
          this.$store.commit("logout")
          this.$router.push({name: "login"})
        })
  },
  methods: {
    updateEmail() {
      if (!this.email || this.email.length === 0)
        return;

      axios
          .put(
              "auth/users/me/",
              {email: this.email}
          )
          .then(response => {
            this.email = response.data.email
          })
          .catch(error => {
            console.log(error)
          })
    }
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