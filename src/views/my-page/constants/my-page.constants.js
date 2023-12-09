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
    nameRouter: NamespaceRouter.SAVED_ALBUMS,
  },
  {
    label: "Đăng xuất",
    nameRouter: "",
  },
];
