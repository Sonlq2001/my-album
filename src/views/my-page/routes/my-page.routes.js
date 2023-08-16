import MyPageScreen from "@/views/my-page/screens/MyPageScreen/MyPageScreen.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

import { MyPagePaths } from "../constants/my-page.paths";

const MY_PAGE_SCREEN = {
  path: MyPagePaths.MY_PAGE,
  name: "MyPage",
  component: MyPageScreen,
  meta: {
    layout: DefaultLayout,
  },
};

export const MY_PAGE_ROUTES = [MY_PAGE_SCREEN];
