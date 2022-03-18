import { createApp } from 'vue';
import App from './App.vue';
import router from "./router/index.js";
import "./assets/css/style.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import storeSession from "./storage/storeSession.js"
import useVuelidate from "@vuelidate/core";



createApp(App).use(router).use(storeSession).use(useVuelidate).mount('#app')
