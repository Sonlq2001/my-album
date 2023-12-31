import { defineStore } from "pinia";

import { appApi } from "@/views/app/app";

export const useAppStore = defineStore("app", {
  id: "app",
  state: () => {
    return {
      searchAlbums: null,
    };
  },
  actions: {
    async getSearchAlbums(q) {
      const res = await appApi.getSearchAlbumsApi(q);
      this.searchAlbums = res.data.metadata;
    },
  },
  getters: {
    listSearchAlbums() {
      return (this.searchAlbums ?? []).map((album) => ({
        ...album,
        albumAvatar: album.albums[0],
      }));
    },
  },
});
