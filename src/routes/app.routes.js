import { createRouter, createWebHistory } from "vue-router";

import { HOME_ROUTES } from "@/views/home/home.js";
import { CATEGORY_ROUTES } from "@/views/category/category.js";
import { ALBUM_ROUTES } from "@/views/album/album.js";
import { AUTH_ROUTES } from "@/views/auth/auth.js";

const routes = [
  ...HOME_ROUTES,
  ...CATEGORY_ROUTES,
  ...ALBUM_ROUTES,
  ...AUTH_ROUTES,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
