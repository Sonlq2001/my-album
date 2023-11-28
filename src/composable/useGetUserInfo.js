import { useAuthStore } from "@/stores/auth/auth.store";

const useGetUserInfo = () => {
  const { authData } = useAuthStore();

  const token = authData?.accessToken;

  return {
    isLogged: Boolean(token),
    accessToken: token,
    userId: authData?.id,
    email: authData?.email,
  };
};

export default useGetUserInfo;
