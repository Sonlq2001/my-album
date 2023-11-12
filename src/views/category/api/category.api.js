import instanceApi from "@/api/api";

import { CategoryEndpoints } from "../constants/category.endpoints";

const getListCategoriesApi = () => {
  return instanceApi.get(CategoryEndpoints.GET_CATEGORIES);
};

export const categoryApi = {
  getListCategoriesApi,
};
