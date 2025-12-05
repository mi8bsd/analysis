<template>
  <div class="Register">
    <div class="row">
      <div class="col-md-6 col-lg-4 col-sm-10 mx-auto border shadow rounded-4 p-4 mt-3">
        <h1 class="mt-3 mt-4 fw-bold">Register</h1>
        <hr/>
        <form @submit.prevent="doRegister">
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
          <div class="input-group mb-3">
            <span class="input-group-text" id="rp-passwd-addon">*</span>
            <input type="password"
                   class="form-control"
                   :class="{'is-invalid': rPasswordErr === true}"
                   placeholder="Repeat Password"
                   aria-label="Repeat Password Password"
                   aria-describedby="rp-passwd-addon"
                   v-model="repeatPassword">
            <div class="invalid-feedback" v-if="rPasswordErr">{{ rPasswordErrMsg }}</div>
          </div>
          <hr/>
          <button class="btn btn-primary" type="submit">Register</button>
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
      repeatPassword: "",
      usernameErr: false,
      usernameErrMsg: null,
      passwordErr: false,
      passwordErrMsg: null,
      rPasswordErr: false,
      rPasswordErrMsg: null,
    }
  },
  methods: {
    doRegister() {
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

      if (this.repeatPassword !== this.password) {
        this.rPasswordErr = true
        this.rPasswordErrMsg = "Passwords are not same"
      } else {
        this.rPasswordErr = false
        this.rPasswordErrMsg = ''
      }

      if (!this.usernameErr && !this.passwordErr && !this.rPasswordErr) {
        axios
            .post(
                "auth/users/",
                {
                  username: this.username,
                  password: this.password
                }
            )
            .then(_ => {
              this.$router.push({name: "login"})
            })
            .catch(error => {
              console.log(error.response.data)
              if (error.response.data["non_field_errors"]) {
                this.passwordErrMsg = error.response.data["non_field_errors"].join(" & ");
              } else if (error.response.data["username"]) {
                this.usernameErr = true
                this.usernameErrMsg = error.response.data["username"].join(" & ")
              } else if (error.response.data["password"]) {
                this.passwordErr = true
                this.passwordErrMsg = error.response.data["password"].join(" & ")
              } else {
                this.passwordErr = true
                this.passwordErrMsg = "Something got wrong"
              }
            })
      }
    }
  }
}
</script>