import CategoryListScreen from "@/views/category/screens/CategoryListScreen/CategoryListScreen.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { NamespaceRouter } from "@/constants/router.constants";

import { CategoryPaths } from "../constants/category.path";

const CATEGORY_SCREEN = {
  path: CategoryPaths.CATEGORY_LIST,
  name: NamespaceRouter.LIST_CATEGORY,
  component: CategoryListScreen,
  meta: {
    layout: DefaultLayout,
  },
};

export const CATEGORY_ROUTES = [CATEGORY_SCREEN];
