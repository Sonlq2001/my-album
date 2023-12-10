import { defineStore } from "pinia";
import get from "lodash.get";

import { albumApi } from "@/views/album/album";

export const useAlbumStore = defineStore("album", {
  id: "album",
  state: () => {
    return {
      listAlbums: null,
      albumDetail: null,
      cancelLoadMore: false,
      total: 0,
    };
  },
  actions: {
    async createAlbum(data) {
      const res = await albumApi.createAlbumApi(data);
      return res.data.metadata;
    },

    async getListAlbumsPublic({ hasSearch, ...rest }) {
      const res = await albumApi.getListAlbumsPublicApi(rest);
      const data = get(res, "data.metadata");
      const meta = get(res, "data.meta");

      if (this.listAlbums && this.listAlbums.length && !hasSearch) {
        this.listAlbums = this.listAlbums.concat(data);
      } else {
        this.listAlbums = data;
      }
      this.cancelLoadMore = this.listAlbums?.length >= meta.total;
      this.total = meta.total;
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

    async bookmarkAlbum(albumId) {
      const res = await albumApi.bookmarkAlbumApi(albumId);
      return res.data.metadata.newValue;
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
