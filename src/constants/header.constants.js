import { NamespaceRouter } from "./router.constants";

export const TIME_DELAY_HEADER_SCROLL = 100; // 0.1s

export const POSITION_ACTIVE_HEADER = 30; // window.scrollY

export const listMenusHeader = ({ slug_user }) => [
  {
    label: "Trang cá nhân",
    nameRouter: NamespaceRouter.PROFILE,
    params: { slug_user },
  },
  {
    label: "Tất cả albums",
    nameRouter: NamespaceRouter.LIST_CATEGORY,
  },
  {
    label: "Tải lên",
    nameRouter: NamespaceRouter.CREATE_ALBUM,
  },
  {
    label: "Quản lý",
    nameRouter: NamespaceRouter.MY_PAGE,
  },
  {
    label: "Đăng xuất",
    nameRouter: "",
  },
];
