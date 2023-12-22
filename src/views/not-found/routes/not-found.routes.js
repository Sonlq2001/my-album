import NotFoundScreen from "@/views/not-found/screens/NotFoundScreen/NotFoundScreen.vue";
import BlankLayout from "@/layouts/BlankLayout.vue";

import { NamespaceRouter } from "@/constants/router.constants";

const NOT_FOUND_SCREEN = {
  path: "/:catchAll(.*)",
  name: NamespaceRouter.NOT_FOUND,
  component: NotFoundScreen,
  meta: {
    layout: BlankLayout,
  },
};

export const NOT_FOUND_ROUTES = [NOT_FOUND_SCREEN];
