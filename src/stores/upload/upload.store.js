import { defineStore } from "pinia";

import { appApi } from "@/views/app/app";

export const useUploadStore = defineStore("upload", {
  id: "upload",
  state: () => {},
  actions: {
    async uploadFiles(data) {
      const res = await appApi.uploadFilesApi(data);
      return res.data.metadata;
    },
  },
});
