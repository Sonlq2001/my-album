import { createRouter, createWebHistory } from "vue-router";

import { HOME_ROUTES } from "@/views/home/home.js";
import { CATEGORY_ROUTES } from "@/views/category/category.js";

const routes = [...HOME_ROUTES, ...CATEGORY_ROUTES];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
