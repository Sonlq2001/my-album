import instanceApi from "@/api/api";
import { AppEndpoints } from "../constants/app.endpoints";

const uploadFilesApi = (data) => {
  return instanceApi.post(AppEndpoints.UPLOAD_FILES, data, {
    headers: { useFormData: true },
  });
};

const getSearchAlbumsApi = (q) => {
  return instanceApi.get(AppEndpoints.GET_SEARCH_ALBUMS, { params: { q } });
};

export const appApi = {
  uploadFilesApi,
  getSearchAlbumsApi,
};
