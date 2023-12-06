import { defineStore } from "pinia";

import { myPageApi } from "@/views/my-page/my-page";

export const useMyPageStore = defineStore("my-page", {
  id: "my-page",
  state: () => {
    return {
      user: null,
      albumsUser: null,
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

    async getAlbumsUserApi(params) {
      const res = await myPageApi.getAlbumsUserApi(params);
      this.albumsUser = res.data.metadata;
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
