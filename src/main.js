import "./assets/style.css";
// import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import toast from 'vue-toastification'

const app = createApp(App);

app.use(router);
// app.use(toast)
// app.use(BootstrapVue)
// app.use(IconsPlugin)

app.mount("#app");
