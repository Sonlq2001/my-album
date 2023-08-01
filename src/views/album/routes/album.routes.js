import AlbumDetailScreen from "@/views/album/screens/AlbumDetailScreen/AlbumDetailScreen.vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";

import { AlbumPaths } from "../constants/album.path";

const ALBUM_SCREEN = {
  path: AlbumPaths.DETAIL,
  name: "Album",
  component: AlbumDetailScreen,
  meta: {
    layout: DefaultLayout,
  },
};

export const ALBUM_ROUTES = [ALBUM_SCREEN];
