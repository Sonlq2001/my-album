import LoginScreen from "@/views/auth/screens/LoginScreen/LoginScreen.vue";
import BlankLayout from "@/layouts/BlankLayout.vue";

import { AuthPaths } from "../constants/auth.path";

const LOGIN_SCREEN = {
  path: AuthPaths.LOGIN,
  name: "AUTH-LOGIN",
  component: LoginScreen,
  meta: {
    layout: BlankLayout,
  },
};

export const AUTH_ROUTES = [LOGIN_SCREEN];
