import MyPageScreen from "@/views/my-page/screens/MyPageScreen/MyPageScreen.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { NamespaceRouter } from "@/constants/router.constants";

import { MyPagePaths } from "../constants/my-page.paths";

const MY_PAGE_SCREEN = {
  path: MyPagePaths.MY_PAGE,
  name: NamespaceRouter.MY_PAGE,
  component: MyPageScreen,
  meta: {
    layout: DefaultLayout,
    isPrivate: true,
  },
};

export const MY_PAGE_ROUTES = [MY_PAGE_SCREEN];
