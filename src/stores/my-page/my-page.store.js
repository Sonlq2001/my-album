import { defineStore } from "pinia";

import { myPageApi } from "@/views/my-page/my-page";

export const useMyPageStore = defineStore("my-page", {
  id: "my-page",
  state: () => {},
  actions: {
    async updateProfileUser(data) {
      await myPageApi.updateProfileUserApi(data);
    },
  },
});
