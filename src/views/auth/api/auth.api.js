import instanceApi from "@/api/api";

import { AuthEndpoints } from "../constants/auth.endpoints";

const loginApi = (data) => {
  return instanceApi.post(AuthEndpoints.LOGIN, data);
};

const refreshTokenApi = () => {
  return instanceApi.post(AuthEndpoints.REFRESH_TOKEN);
};

const logoutApi = () => {
  return instanceApi.post(AuthEndpoints.LOGOUT);
};

const registerApi = (data) => {
  return instanceApi.post(AuthEndpoints.REGISTER, data);
};

export const authApi = {
  loginApi,
  refreshTokenApi,
  logoutApi,
  registerApi,
};
