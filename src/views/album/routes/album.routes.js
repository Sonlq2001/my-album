import AlbumDetailScreen from "@/views/album/screens/AlbumDetailScreen/AlbumDetailScreen.vue";
import CreateAlbum from "@/views/album/screens/CreateAlbum/CreateAlbum.vue";
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

const CREATE_ALBUM_SCREEN = {
  path: AlbumPaths.CREATE_ALBUM,
  name: "CREATE-ALBUM",
  component: CreateAlbum,
  meta: {
    layout: DefaultLayout,
  },
};

export const ALBUM_ROUTES = [ALBUM_SCREEN, CREATE_ALBUM_SCREEN];
