import instanceApi from "@/api/api";
import { MyPageEndpoints } from "../constants/my-page.endpoints";

const updateProfileUserApi = ({ userId, ...reset }) => {
  return instanceApi.patch(
    MyPageEndpoints.PATCH_PROFILE.replace(":user_id", userId),
    reset
  );
};

const getUserApi = (userId) => {
  return instanceApi.get(MyPageEndpoints.GET_USER.replace(":user_id", userId));
};

const getAlbumsUserApi = (params) => {
  return instanceApi.get(MyPageEndpoints.GET_ALBUMS_USER, { params });
};

const getBookmarksApi = (params) => {
  return instanceApi.get(MyPageEndpoints.GET_BOOKMARKS, { params });
};

const getUserInfoApi = (slugUser) => {
  return instanceApi.get(
    MyPageEndpoints.GET_USER_INFO.replace(":slug_user", slugUser)
  );
};

export const myPageApi = {
  updateProfileUserApi,
  getUserApi,
  getAlbumsUserApi,
  getBookmarksApi,
  getUserInfoApi,
};
