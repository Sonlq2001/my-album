import CategoryScreen from "@/views/category/screens/CategoryScreen.vue";
import BlankLayout from "@/layouts/BlankLayout.vue";

import { CategoryPaths } from "../constants/category.path";

const CATEGORY_SCREEN = {
  path: CategoryPaths.CATEGORY_LIST,
  name: "Category",
  component: CategoryScreen,
  meta: {
    layout: BlankLayout,
  },
};

export const CATEGORY_ROUTES = [CATEGORY_SCREEN];
