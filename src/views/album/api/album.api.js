import instanceApi from "@/api/api";
import { AlbumEndpoints } from "../constants/album.endpoints";

const uploadFilesAlbumApi = (data) => {
  return instanceApi.post(AlbumEndpoints.UPLOAD_FILES, data, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const createAlbumApi = async (data) => {
  return instanceApi.post(AlbumEndpoints.CREATE_ALBUM, data);
};

export const albumApi = {
  uploadFilesAlbumApi,
  createAlbumApi,
};
