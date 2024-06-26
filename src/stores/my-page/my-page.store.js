import { defineStore } from "pinia";
import get from "lodash.get";

import { myPageApi } from "@/views/my-page/my-page";

export const useMyPageStore = defineStore("my-page", {
  id: "my-page",
  state: () => {
    return {
      user: null,
      albumsUser: {
        total: 0,
        list: null,
        cancelLoadMore: false,
      },
      bookmarks: {
        total: 0,
        list: null,
        cancelLoadMore: false,
      },
      cancelLoadMore: false,
      total: 0,
      userInfo: null,
      userAlbumsInfo: {
        list: null,
        total: 0,
        cancelLoadMore: false,
      },
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

    async getAlbumsUser({ hasSearch, ...rest }) {
      const res = await myPageApi.getAlbumsUserApi(rest);
      const data = get(res, "data.metadata");
      const meta = get(res, "data.meta");

      if (this.albumsUser.list && this.albumsUser.list.length && !hasSearch) {
        this.albumsUser.list = this.albumsUser.list.concat(data);
      } else {
        this.albumsUser.list = data;
      }
      this.albumsUser.total = meta?.total;
      this.albumsUser.cancelLoadMore =
        this.albumsUser.list?.length >= meta?.total;
    },

    resetAlbumsUser() {
      this.albumsUser = {
        total: 0,
        list: null,
        cancelLoadMore: false,
      };
    },

    async getBookmarks({ hasSearch, ...rest }) {
      const res = await myPageApi.getBookmarksApi(rest);
      const data = get(res, "data.metadata");
      const meta = get(res, "data.meta");

      if (this.bookmarks.list && this.bookmarks.list.length && !hasSearch) {
        this.bookmarks.list = this.bookmarks.list.concat(data);
      } else {
        this.bookmarks.list = data;
      }
      this.bookmarks.total = meta?.total;
      this.bookmarks.cancelLoadMore =
        this.bookmarks.list?.length >= meta?.total;
    },

    async getUserInfo(slugUser) {
      const res = await myPageApi.getUserInfoApi(slugUser);
      this.userInfo = res.data.metadata;
    },

    async getUserAlbumsInfo(params) {
      const res = await myPageApi.getUserAlbumsInfoApi(params);
      const data = get(res, "data.metadata");
      const meta = get(res, "data.meta");

      this.userAlbumsInfo.list = data;
      this.userAlbumsInfo.total = meta?.total;
    },

    resetUserInfo() {
      this.userInfo = null;
      this.userAlbumsInfo = { list: null, total: 0 };
    },

    async deleteManyAlbums(ids = []) {
      await myPageApi.deleteManyAlbumsApi(ids);
      this.albumsUser.list = (this.albumsUser.list ?? []).filter(
        (item) => !ids.includes(item.id)
      );
    },
  },

  getters: {
    listBookmarks() {
      return (this.bookmarks.list ?? []).map((album) => ({
        ...album,
        albumAvatar: album.albums[0],
      }));
    },
    listUserAlbumsInfo() {
      return (this.userAlbumsInfo.list ?? []).map((album) => ({
        ...album,
        albumAvatar: album.albums[0],
      }));
    },
  },
});
