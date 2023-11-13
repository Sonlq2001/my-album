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

const getAlbumDetailPublicApi = async (slug) => {
  return instanceApi.get(
    AlbumEndpoints.GET_ALBUM_DETAIL_PUBLIC.replace(":slug", slug)
  );
};

const getAlbumDetailPrivateApi = async (slug) => {
  return instanceApi.get(
    AlbumEndpoints.GET_ALBUM_DETAIL_PRIVATE.replace(":slug", slug)
  );
};

export const albumApi = {
  uploadFilesAlbumApi,
  createAlbumApi,
  getListAlbumsPublicApi,
  getAlbumDetailPublicApi,
  getAlbumDetailPrivateApi,
};
