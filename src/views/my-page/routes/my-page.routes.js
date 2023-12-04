import MyPageScreen from "@/views/my-page/screens/MyPageScreen/MyPageScreen.vue";
import ProfileScreen from "@/views/my-page/screens/ProfileScreen/ProfileScreen.vue";
import MyAlbumList from "@/views/my-page/screens/MyAlbumList/MyAlbumList.vue";
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

const PROFILE_SCREEN = {
  path: MyPagePaths.PROFILE,
  name: NamespaceRouter.PROFILE,
  component: ProfileScreen,
  meta: {
    layout: DefaultLayout,
    isPrivate: true,
  },
};

const ALBUM_LIST_SCREEN = {
  path: MyPagePaths.ALBUM_LIST,
  name: NamespaceRouter.ALBUM_LIST,
  component: MyAlbumList,
  meta: {
    layout: DefaultLayout,
    isPrivate: true,
  },
};

export const MY_PAGE_ROUTES = [
  MY_PAGE_SCREEN,
  PROFILE_SCREEN,
  ALBUM_LIST_SCREEN,
];
