import { NamespaceRouter } from "./router.constants";

export const TIME_DELAY_HEADER_SCROLL = 100; // 0.1s

export const POSITION_ACTIVE_HEADER = 30; // window.scrollY

export const MENUS_HEADER = [
  {
    label: "Thông tin cá nhân",
    nameRouter: NamespaceRouter.MY_PAGE,
  },
  {
    label: "Tải lên",
    nameRouter: NamespaceRouter.CREATE_ALBUM,
  },
  {
    label: "Cài đặt",
    nameRouter: NamespaceRouter.CREATE_ALBUM,
  },
  {
    label: "Đăng xuất",
    nameRouter: "",
  },
];
