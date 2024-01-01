import { defineStore } from "pinia";
import get from "lodash.get";

import { appApi } from "@/views/app/app";

export const useAppStore = defineStore("app", {
  id: "app",
  state: () => {
    return {
      searchAlbums: { list: null, total: 0 },
    };
  },
  actions: {
    async getSearchAlbums(q) {
      const res = await appApi.getSearchAlbumsApi(q);
      const data = get(res, "data.metadata");
      const meta = get(res, "data.meta");

      this.searchAlbums.list = data;
      this.searchAlbums.total = meta?.total;
    },
    resetSearchAlbums() {
      this.searchAlbums = { list: null, total: 0 };
    },
  },
  getters: {
    listSearchAlbums() {
      return (this.searchAlbums.list ?? []).map((album) => ({
        ...album,
        albumAvatar: album.albums[0],
      }));
    },
  },
});
