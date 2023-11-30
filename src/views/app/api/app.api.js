import instanceApi from "@/api/api";
import { AppEndpoints } from "../constants/app.endpoints";

const uploadFilesApi = (data) => {
  return instanceApi.post(AppEndpoints.UPLOAD_FILES, data, {
    headers: { useFormData: true },
  });
};

export const appApi = {
  uploadFilesApi,
};
