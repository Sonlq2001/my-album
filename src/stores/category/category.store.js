import { defineStore } from "pinia";

import { categoryApi } from "@/views/category/category";

export const useCategoryStore = defineStore("category", {
  id: "category",
  state: () => {
    return {
      listCategories: null,
    };
  },
  actions: {
    async getListCategories() {
      const res = await categoryApi.getListCategoriesApi();
      this.listCategories = res.data.metadata;
    },
  },
});
