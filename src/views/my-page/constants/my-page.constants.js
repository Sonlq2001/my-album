import { NamespaceRouter } from "@/constants/router.constants";

export const MENUS_MY_PAGE = [
  {
    label: "Thông tin cá nhân",
    nameRouter: NamespaceRouter.PROFILE,
  },
  {
    label: "Albums đã lưu",
    nameRouter: NamespaceRouter.HOME,
  },
  {
    label: "Albums của bạn",
    nameRouter: NamespaceRouter.HOME,
  },
  {
    label: "Đăng xuất",
    nameRouter: "",
  },
];
