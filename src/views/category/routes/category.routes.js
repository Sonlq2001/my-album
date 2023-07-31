import CategoryScreen from "@/views/category/screens/CategoryScreen.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

import { CategoryPaths } from "../constants/category.path";

const CATEGORY_SCREEN = {
  path: CategoryPaths.CATEGORY_LIST,
  name: "Category",
  component: CategoryScreen,
  meta: {
    layout: DefaultLayout,
  },
};

export const CATEGORY_ROUTES = [CATEGORY_SCREEN];
