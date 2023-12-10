import instanceApi from "@/api/api";
import { AlbumEndpoints } from "../constants/album.endpoints";

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

const bookmarkAlbumApi = async (albumId) => {
  return instanceApi.patch(AlbumEndpoints.PATCH_BOOKMARK, { albumId });
};

export const albumApi = {
  createAlbumApi,
  getListAlbumsPublicApi,
  getAlbumDetailPublicApi,
  getAlbumDetailPrivateApi,
  bookmarkAlbumApi,
};
