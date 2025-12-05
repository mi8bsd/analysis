import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/src/jquery'
import 'popper.js/dist/popper.min'
import 'bootstrap/dist/js/bootstrap.min.js'
import axios from "axios";


axios.defaults.baseURL = "http://localhost:8000/api/"

createApp(App).use(store).use(router).mount('#app')
