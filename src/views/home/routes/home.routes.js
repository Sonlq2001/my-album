import HomeScreen from "@/views/home/screens/HomeScreen/HomeScreen.vue";
import TopLayout from "@/layouts/TopLayout.vue";

import { HomePaths } from "../constants/home.path";
import { NamespaceRouter } from "@/constants/router.constants";

const HOME_SCREEN = {
  path: HomePaths.ROOT,
  name: NamespaceRouter.HOME,
  component: HomeScreen,
  meta: {
    layout: TopLayout,
  },
};

export const HOME_ROUTES = [HOME_SCREEN];
