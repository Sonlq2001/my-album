import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import "vue3-carousel/dist/carousel.css";

import "./assets/styles/tailwind.css";
import "./assets/styles/global.css";
import App from "./App.vue";
import router from "./routes/app.routes";

const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(pinia);
pinia.use(piniaPluginPersistedstate);

app.mount("#app");
