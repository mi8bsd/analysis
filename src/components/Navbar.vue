<template>
  <div class="Navbar">
    <nav class="navbar navbar-expand-lg navbar-light mb-5" data-bs-theme="light" id="nav">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand">My WebSite</router-link>
        <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#myNavBar"
                aria-controls="myNavBar" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="navbar-collapse collapse" id="myNavBar" style="">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item" v-if="!$store.state.isAuthenticated">
              <router-link :to="{'name': 'login'}" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item" v-if="!$store.state.isAuthenticated">
              <router-link :to="{'name': 'register'}" class="nav-link">Register</router-link>
            </li>
          </ul>

          <div class="dropdown me-5" v-if="$store.state.isAuthenticated">
            <button class="btn btn-outline-primary dropdown-toggle" href="#" id="navbarDropdown" role="button"
                    data-bs-toggle="dropdown" aria-expanded="false">
              Hello {{ $store.state.user.username }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li>
                <router-link :to="{'name': 'profile'}" class="dropdown-item">Profile</router-link>
              </li>
              <li>
                <router-link :to="{'name': 'add'}" class="dropdown-item">Write an article</router-link>
              </li>
              <li>
                <router-link :to="{'name': 'logout'}" class="dropdown-item">Logout</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>

<style>
nav {
  background-color: #e3f2fd;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

.navbar-collapse a.router-link-exact-active {
  color: #0099ff !important;
}

.dropdown-menu a.router-link-exact-active {
  color: #000000 !important;
}

</style>