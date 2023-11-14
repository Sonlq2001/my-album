import { useAuthStore } from "@/stores/auth/auth.store";

const useGetUserInfo = () => {
  const { authData } = useAuthStore();

  return {
    isLogged: Boolean(authData?.accessToken),
    accessToken: authData?.accessToken,
    userId: authData?.id,
  };
};

export default useGetUserInfo;
