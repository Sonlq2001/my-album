import { defineStore } from "pinia";

import { authApi } from "@/views/auth/api/auth.api";

export const useAuthStore = defineStore("auth", {
  id: "auth",
  state: () => {
    return {
      userInfo: null,
      authData: null,
    };
  },
  actions: {
    async login(data) {
      const res = await authApi.loginApi(data);
      const { accessToken, id } = res.data.metadata;

      this.userInfo = res.data.metadata;
      this.authData = {
        accessToken,
        id,
      };
    },

    async refreshToken() {
      const res = await authApi.refreshTokenApi();
      this.authData = {
        ...this.authData,
        accessToken: res.data.metadata.accessToken,
      };
    },

    async logout() {
      const result = await authApi.logoutApi();
      this.authData = null;
    },
  },
  persist: {
    key: "auth",
    paths: ["authData"],
  },
});
