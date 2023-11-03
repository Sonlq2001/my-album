import LoginScreen from "@/views/auth/screens/LoginScreen/LoginScreen.vue";
import BlankLayout from "@/layouts/BlankLayout.vue";

import { AuthPaths } from "../constants/auth.path";
import { NamespaceRouter } from "@/constants/router.constants";

const LOGIN_SCREEN = {
  path: AuthPaths.LOGIN,
  name: NamespaceRouter.LOGIN,
  component: LoginScreen,
  meta: {
    layout: BlankLayout,
    isAuth: true,
  },
};

export const AUTH_ROUTES = [LOGIN_SCREEN];
