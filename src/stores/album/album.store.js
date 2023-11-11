import { defineStore } from "pinia";

import { albumApi } from "@/views/album/album";

export const useAlbumStore = defineStore("album", {
  id: "album",
  state: () => {
    return {
      listAlbums: null,
    };
  },
  actions: {
    async uploadFiles(data) {
      const res = await albumApi.uploadFilesAlbumApi(data);
      return res.data.metadata;
    },
    async createAlbum(data) {
      const res = await albumApi.createAlbumApi(data);
      return res.data.metadata;
    },
    async getListAlbumsPublic(params) {
      const res = await albumApi.getListAlbumsPublicApi(params);
      this.listAlbums = res.data.metadata;
    },
  },
  getters: {
    listAlbumsData() {
      return (this.listAlbums ?? []).map((album) => ({
        ...album,
        albumAvatar: album.albums[0],
      }));
    },
  },
});
