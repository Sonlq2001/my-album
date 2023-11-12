import { onMounted } from "vue";

import { useCategoryStore } from "@/stores/category/category.store";

const useGetCategory = () => {
  const categoryStore = useCategoryStore();

  onMounted(async () => {
    await categoryStore.getListCategories();
  });
};

export default useGetCategory;
