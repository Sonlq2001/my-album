import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { ObserveVisibility } from "vue-observe-visibility";
import "vue3-carousel/dist/carousel.css";
import JSZip from "jszip";
import VueDragscroll from "vue-dragscroll";

import "./assets/styles/tailwind.css";
import "./assets/styles/global.css";
import App from "./App.vue";
import router from "./routes/app.routes";

const pinia = createPinia();

const app = createApp(App);

app.use(router);
app.use(pinia);
pinia.use(piniaPluginPersistedstate);

app.directive("observe-visibility", {
  beforeMount: (el, binding, vnode) => {
    vnode.context = binding.instance;
    ObserveVisibility.bind(el, binding, vnode);
  },
  update: ObserveVisibility.update,
  unmounted: ObserveVisibility.unbind,
});

app.use(JSZip);
app.use(VueDragscroll);

app.mount("#app");
