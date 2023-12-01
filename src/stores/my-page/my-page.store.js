import { defineStore } from "pinia";

import { myPageApi } from "@/views/my-page/my-page";

export const useMyPageStore = defineStore("my-page", {
  id: "my-page",
  state: () => {
    return {
      user: null,
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
  },
});
