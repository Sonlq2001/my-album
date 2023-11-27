import debounce from "lodash.debounce";

import { DELAY_REDIRECT_LOGIN } from "@/constants/http.constants";
import { useAuthStore } from "@/stores/auth/auth.store";

const useLogout = () => {
  const authStore = useAuthStore();

  const handleLogout = debounce(() => {
    authStore
      .logout()
      .then(() => {
        setTimeout(() => {
          window.location.reload();
        }, DELAY_REDIRECT_LOGIN);
      })
      .catch(() => {
        // TODO: handle error
      });
  }, DELAY_REDIRECT_LOGIN);

  return handleLogout;
};

export default useLogout;
