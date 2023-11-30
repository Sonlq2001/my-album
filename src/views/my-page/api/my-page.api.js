import instanceApi from "@/api/api";
import { MyPageEndpoints } from "../constants/my-page.endpoints";

const updateProfileUserApi = ({ userId, ...reset }) => {
  return instanceApi.patch(
    MyPageEndpoints.PATCH_PROFILE.replace(":user_id", userId),
    reset
  );
};

export const myPageApi = {
  updateProfileUserApi,
};
