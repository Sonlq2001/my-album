import { createApp } from "vue";

import "./assets/styles/tailwind.css";
import "./assets/styles/global.css";
import App from "./App.vue";
import router from "./routes/app.routes";

const app = createApp(App);

app.use(router);

app.mount("#app");
