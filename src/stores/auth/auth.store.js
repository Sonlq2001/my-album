import { defineStore } from "pinia";

import { authApi } from "@/views/auth/auth";

export const useAuthStore = defineStore("auth", {
  id: "auth",
  state: () => {
    return {
      userInfo: null,
      authData: null,
      isRegisterSuccess: false,
    };
  },
  actions: {
    async login(data) {
      const res = await authApi.loginApi(data);
      const { accessToken, id, name, email, avatar, background, slug } =
        res.data.metadata;

      this.userInfo = res.data.metadata;
      this.authData = {
        accessToken,
        id,
        name,
        email,
        avatar,
        background,
        slug,
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
      await authApi.logoutApi();
      this.authData = null;
    },

    async register(data) {
      await authApi.registerApi(data);
      this.isRegisterSuccess = true;
    },

    updateUserStore(data) {
      this.authData = {
        ...this.authData,
        ...data,
      };
    },
  },
  persist: {
    key: "auth",
    paths: ["authData"],
  },
});
