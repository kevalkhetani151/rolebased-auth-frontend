import { BASE_URL } from "@src/config/config";

export const apiRoutes = {
  login: {
    POST: {
      query: "Login",
      method: "POST",
      url: `${BASE_URL}/user/login`,
    },
  },
};
