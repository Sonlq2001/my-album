import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import useGetUserInfo from "@/composable/useGetUserInfo";
import { useAuthStore } from "@/stores/auth/auth.store";
import { toCamel, toSnakeCase } from "@/helpers/convert-object";
import {
  HTTP_STATUS,
  HEADER,
  DELAY_REDIRECT_LOGIN,
} from "@/constants/http.constants";
import { AuthPaths } from "@/views/auth/auth";

const requestInterceptor = (req) => {
  const { accessToken, userId } = useGetUserInfo();
  req.params = toSnakeCase(req.params, true);
  req.data = toSnakeCase(req.data, true);

  if (accessToken && userId) {
    req.headers[HEADER.AUTHORIZATION] = `Bearer ${accessToken}`;
    req.headers[HEADER.CLIENT_ID] = userId;
  }
  return req;
};

const responseInterceptor = (res) => {
  res.data = toCamel(res.data);
  return res;
};

const errorInterceptor = async (error) => {
  if (error && error.response) {
    const status = error.response.status;
    const message = error.response.data.message;
    if (
      status === HTTP_STATUS.UNAUTHORIZED &&
      message === "expired_refresh_token"
    ) {
      localStorage.clear();
      setTimeout(() => {
        window.location.reload();
        window.location.href = AuthPaths.LOGIN;
      }, DELAY_REDIRECT_LOGIN);
    }
    return Promise.reject(error.response);
  }
  return Promise.reject(error);
};

const instanceApi = axios.create({
  baseURL: import.meta.env.VITE_API,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const refreshAuthLogic = async () => {
  const { isLogin } = useGetUserInfo();
  const authStore = useAuthStore();
  if (isLogin) {
    await authStore.refreshToken();
  }

  return Promise.resolve();
};

createAuthRefreshInterceptor(instanceApi, refreshAuthLogic, {
  statusCodes: [HTTP_STATUS.REQUEST_TIMEOUT],
});

instanceApi.interceptors.request.use(requestInterceptor);
instanceApi.interceptors.response.use(responseInterceptor, errorInterceptor);

export default instanceApi;
