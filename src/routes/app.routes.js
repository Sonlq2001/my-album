import { createRouter, createWebHistory } from "vue-router";

import { HOME_ROUTES } from "@/views/home/home.js";
import { CATEGORY_ROUTES } from "@/views/category/category.js";
import { ALBUM_ROUTES } from "@/views/album/album.js";
import { AUTH_ROUTES } from "@/views/auth/auth.js";
import { MY_PAGE_ROUTES } from "@/views/my-page/my-page.js";

import { NamespaceRouter } from "@/constants/router.constants";
import useGetUserInfo from "@/composable/useGetUserInfo";

const routes = [
  ...HOME_ROUTES,
  ...CATEGORY_ROUTES,
  ...ALBUM_ROUTES,
  ...AUTH_ROUTES,
  ...MY_PAGE_ROUTES,
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const { isLogin } = useGetUserInfo();
  if (!isLogin && to.meta?.isPrivate) {
    return next({ name: NamespaceRouter.LOGIN });
  }

  if (isLogin && to.meta?.isAuth) {
    return next({ name: NamespaceRouter.history });
  }

  next();
});

export default router;
