import instanceApi from "@/api/api";
import { AlbumEndpoints } from "../constants/album.endpoints";

const uploadFilesAlbumApi = (data) => {
  return instanceApi.post(AlbumEndpoints.UPLOAD_FILES, data, {
    headers: { useFormData: true },
  });
};

const createAlbumApi = async (data) => {
  return instanceApi.post(AlbumEndpoints.CREATE_ALBUM, data);
};

const getListAlbumsPublicApi = async (params) => {
  return instanceApi.get(AlbumEndpoints.GET_ALBUMS_PUBLIC, { params });
};

export const albumApi = {
  uploadFilesAlbumApi,
  createAlbumApi,
  getListAlbumsPublicApi,
};
