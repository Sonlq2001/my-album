import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
  id: "search",
  state: () => {
    return {
      keyword: "",
    };
  },
  actions: {
    setKeyword(keyword) {
      this.keyword = keyword;
    },
  },
  persist: {
    key: "keyword",
    paths: ["keyword"],
  },
});
