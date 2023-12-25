import { NamespaceRouter } from "@/constants/router.constants";

export const MENUS_MY_PAGE = [
  {
    label: "Thông tin cá nhân",
    nameRouter: NamespaceRouter.PROFILE,
  },
  {
    label: "Albums của bạn",
    nameRouter: NamespaceRouter.ALBUM_LIST,
  },
  {
    label: "Albums đã lưu",
    nameRouter: NamespaceRouter.BOOKMARK_LIST,
  },
  {
    label: "Đăng xuất",
    nameRouter: "",
  },
];

export const FILTER_VALUE = {
  ALL: "all",
  ALBUM_PUBLIC: "public",
  ALBUM_PRIVATE: "private",
};

export const LIST_FILTER_ALBUMS = [
  {
    label: "Tất cả",
    value: FILTER_VALUE.ALL,
  },
  {
    label: "Công khai",
    value: FILTER_VALUE.ALBUM_PUBLIC,
  },
  {
    label: "Riêng tư",
    value: FILTER_VALUE.ALBUM_PRIVATE,
  },
];
