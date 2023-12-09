import { NamespaceRouter } from "./router.constants";

export const TIME_DELAY_HEADER_SCROLL = 100; // 0.1s

export const POSITION_ACTIVE_HEADER = 30; // window.scrollY

export const MENUS_HEADER = [
  {
    label: "Tất cả albums",
    nameRouter: NamespaceRouter.LIST_CATEGORY,
  },
  {
    label: "Tải lên",
    nameRouter: NamespaceRouter.CREATE_ALBUM,
  },
  {
    label: "Cài đặt",
    nameRouter: NamespaceRouter.MY_PAGE,
  },
  {
    label: "Đăng xuất",
    nameRouter: "",
  },
];
