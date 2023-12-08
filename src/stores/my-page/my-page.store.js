import { defineStore } from "pinia";
import get from "lodash.get";

import { myPageApi } from "@/views/my-page/my-page";

export const useMyPageStore = defineStore("my-page", {
  id: "my-page",
  state: () => {
    return {
      user: null,
      albumsUser: null,
      cancelLoadMore: false,
      total: 0,
    };
  },
  actions: {
    async updateProfileUser(data) {
      const res = await myPageApi.updateProfileUserApi(data);
      this.user = res.data.metadata;
      return res.data.metadata;
    },

    async getUser(userId) {
      const res = await myPageApi.getUserApi(userId);
      this.user = res.data.metadata;
    },

    async getAlbumsUserApi({ hasSearch, ...rest }) {
      const res = await myPageApi.getAlbumsUserApi(rest);
      const data = get(res, "data.metadata");
      const meta = get(res, "data.meta");

      if (this.albumsUser && this.albumsUser.length && !hasSearch) {
        this.albumsUser = this.albumsUser.concat(data);
      } else {
        this.albumsUser = data;
      }
      this.total = meta?.total;
      this.cancelLoadMore = this.albumsUser?.length >= meta?.total;
    },

    resetAlbumsUser() {
      this.total = 0;
      this.albumsUser = null;
      this.cancelLoadMore = false;
    },
  },

  getters: {
    listAlbumsUser() {
      return (this.albumsUser ?? []).map((album) => ({
        ...album,
        albumAvatar: album.albums[0],
      }));
    },
  },
});
