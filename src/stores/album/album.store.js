import { defineStore } from "pinia";

import { albumApi } from "@/views/album/album";

export const useAlbumStore = defineStore("album", {
  id: "album",
  state: () => {
    return {
      listAlbums: null,
      albumDetail: null,
      cancelLoadMore: false,
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
      if (this.listAlbums && this.listAlbums.length) {
        this.listAlbums = this.listAlbums.concat(res.data.metadata);
      } else {
        this.listAlbums = res.data.metadata;
      }
      this.cancelLoadMore = this.listAlbums?.length >= res.data.meta?.total;
    },
    async getAlbumDetailPublic(slug) {
      const res = await albumApi.getAlbumDetailPublicApi(slug);
      this.albumDetail = res.data.metadata;
    },
    async getAlbumDetailPrivate(slug) {
      const res = await albumApi.getAlbumDetailPrivateApi(slug);
      this.albumDetail = res.data.metadata;
    },
    resetAlbumDetail() {
      this.albumDetail = null;
    },
    resetListAlbums() {
      this.listAlbums = null;
      this.cancelLoadMore = false;
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
