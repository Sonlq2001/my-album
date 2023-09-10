import { HomePaths } from "../views/home/home";

export const NAV_HEADER = [
  {
    label: "Trang chủ",
    path: HomePaths.ROOT,
    icon: "ri-home-heart-fill",
  },
  {
    label: "Thiên nhiên",
    path: "/category/nature", // TODO: path
    icon: "ri-seedling-line",
  },
  {
    label: "Động vật",
    path: "/category/animal", // TODO: path
    icon: "ri-camera-line",
  },
];
