import { createApp } from "vue";
import App from "./App.vue";
import router from "./vue-router/index";
import vuex from "./vuex/index";

const app = createApp(App);
app.use(router);
app.use(vuex);
app.mount("#app");
