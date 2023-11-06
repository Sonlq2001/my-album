import { defineStore } from "pinia";

import { albumApi } from "@/views/album/album";

export const useAlbumStore = defineStore("album", {
  id: "album",
  state: () => {
    return {};
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
  },
});
