import LoginScreen from "@/views/auth/screens/LoginScreen/LoginScreen.vue";
import RegisterScreen from "@/views/auth/screens/RegisterScreen/RegisterScreen.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

import { AuthPaths } from "../constants/auth.path";
import { NamespaceRouter } from "@/constants/router.constants";

const LOGIN_SCREEN = {
  path: AuthPaths.LOGIN,
  name: NamespaceRouter.LOGIN,
  component: LoginScreen,
  meta: {
    layout: AuthLayout,
    isAuth: true,
  },
};

const REGISTER_SCREEN = {
  path: AuthPaths.REGISTER,
  name: NamespaceRouter.REGISTER,
  component: RegisterScreen,
  meta: {
    layout: AuthLayout,
    isAuth: true,
  },
};

export const AUTH_ROUTES = [LOGIN_SCREEN, REGISTER_SCREEN];
