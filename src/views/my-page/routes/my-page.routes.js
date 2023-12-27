import MyPageScreen from "@/views/my-page/screens/MyPageScreen/MyPageScreen.vue";
import SettingProfileScreen from "@/views/my-page/screens/SettingProfileScreen/SettingProfileScreen.vue";
import MyAlbumList from "@/views/my-page/screens/MyAlbumList/MyAlbumList.vue";
import BookmarkList from "@/views/my-page/screens/BookmarkList/BookmarkList.vue";
import ProfileScreen from "@/views/my-page/screens/ProfileScreen/ProfileScreen.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import MyPageLayout from "@/layouts/MyPageLayout.vue";
import { NamespaceRouter } from "@/constants/router.constants";

import { MyPagePaths } from "../constants/my-page.paths";

const MY_PAGE_SCREEN = {
  path: MyPagePaths.MY_PAGE,
  name: NamespaceRouter.MY_PAGE,
  component: MyPageScreen,
  meta: {
    layout: MyPageLayout,
    isPrivate: true,
  },
};

const SETTING_PROFILE_SCREEN = {
  path: MyPagePaths.SETTING_PROFILE,
  name: NamespaceRouter.SETTING_PROFILE,
  component: SettingProfileScreen,
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

const BOOKMARK_LIST_SCREEN = {
  path: MyPagePaths.BOOKMARK_LIST,
  name: NamespaceRouter.BOOKMARK_LIST,
  component: BookmarkList,
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
    layout: MyPageLayout,
  },
};

export const MY_PAGE_ROUTES = [
  MY_PAGE_SCREEN,
  SETTING_PROFILE_SCREEN,
  ALBUM_LIST_SCREEN,
  BOOKMARK_LIST_SCREEN,
  PROFILE_SCREEN,
];
