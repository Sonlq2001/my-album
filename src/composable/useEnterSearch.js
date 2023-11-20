import { useRouter } from "vue-router";

import { NamespaceRouter } from "@/constants/router.constants";
import { useSearchStore } from "@/stores/search/search.store";

const useEnterSearch = () => {
  const router = useRouter();

  const searchStore = useSearchStore();

  const handleEnterSearch = (e) => {
    if (e.keyCode === 13) {
      searchStore.setKeyword(e.target.value);
      router.push({
        name: NamespaceRouter.LIST_CATEGORY,
        query: {
          keyword: e.target.value,
        },
      });
    }
  };

  return handleEnterSearch;
};

export default useEnterSearch;
