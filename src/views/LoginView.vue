<template>
  <div class="Login">
    <div class="row">
      <div class="col-md-6 col-lg-4 col-sm-10 mx-auto border shadow rounded-4 p-4 mt-3">
        <h1 class="mt-3 mt-4 fw-bold">Login</h1>
        <hr/>
        <form @submit.prevent="doLogin">
          <div class="input-group mb-3">
            <span class="input-group-text" id="user-addon">@</span>
            <input
                type="text"
                class="form-control"
                :class="{'is-invalid': usernameErr === true}"
                placeholder="Username"
                aria-label="Username"
                aria-describedby="user-addon"
                v-model="username">
            <div class="invalid-feedback" v-if="usernameErr">{{ usernameErrMsg }}</div>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="passwd-addon">*</span>
            <input type="password"
                   class="form-control"
                   :class="{'is-invalid': passwordErr === true}"
                   placeholder="Password"
                   aria-label="Password"
                   aria-describedby="passwd-addon"
                   v-model="password">
            <div class="invalid-feedback" v-if="passwordErr">{{ passwordErrMsg }}</div>
          </div>
          <hr/>
          <button class="btn btn-primary" type="submit">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      usernameErr: false,
      usernameErrMsg: null,
      passwordErr: false,
      passwordErrMsg: null,
    }
  },
  methods: {
    doLogin() {
      if (this.username.length < 3) {
        this.usernameErr = true
        this.usernameErrMsg = this.username.length === 0 ? "Username cannot be empty" : "Username must be at least 3 characters"
      } else {
        this.usernameErr = false
        this.usernameErrMsg = ''
      }

      if (this.password.length < 8) {
        this.passwordErr = true
        this.passwordErrMsg = this.username.length === 0 ? "Password cannot be empty" : "Password must be at least 8 characters"
      } else {
        this.passwordErr = false
        this.passwordErrMsg = ''
      }

      if (!this.usernameErr && !this.passwordErr) {
        axios
            .post(
                "auth/token/login/",
                {
                  username: this.username,
                  password: this.password
                }
            )
            .then(response => {
              let token = response.data["auth_token"]
              this.$store.commit("login", token)
              this.$router.push({name: "profile"})
            })
            .catch(error => {
              let msg = error.response.data["non_field_errors"].join(", ");
              console.log(msg)
              this.usernameErr = this.passwordErr = true;
              this.passwordErrMsg = msg;
            })
      }
    }
  }
}
</script>