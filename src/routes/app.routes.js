import { createRouter, createWebHistory } from "vue-router";

import { HOME_ROUTES } from "@/views/home/home.js";
import { CATEGORY_ROUTES } from "@/views/category/category.js";
import { ALBUM_ROUTES } from "@/views/album/album.js";
import { AUTH_ROUTES } from "@/views/auth/auth.js";
import { MY_PAGE_ROUTES } from "@/views/my-page/my-page.js";
import { NOT_FOUND_ROUTES } from "@/views/not-found/not-found";

import { NamespaceRouter } from "@/constants/router.constants";
import useGetUserInfo from "@/composable/useGetUserInfo";

const routes = [
  ...HOME_ROUTES,
  ...CATEGORY_ROUTES,
  ...ALBUM_ROUTES,
  ...AUTH_ROUTES,
  ...MY_PAGE_ROUTES,
  ...NOT_FOUND_ROUTES,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return {
      top: 0,
    };
  },
});

router.beforeEach((to, from, next) => {
  const { isLogged } = useGetUserInfo();
  if (!isLogged && to.meta?.isPrivate) {
    return next({ name: NamespaceRouter.LOGIN });
  }

  if (isLogged && to.meta?.isAuth) {
    return next({ name: NamespaceRouter.history });
  }

  next();
});

export default router;
