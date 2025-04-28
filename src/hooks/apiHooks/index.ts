import { useMutation } from "react-query";
import useAxios from "../useAxios";
import { apiRoutes } from "./route";
import {
  ILoginRequest,
  ILoginResponce,
} from "@src/utils/@types/ILoginResponce";

const { login } = apiRoutes;

export const useUserLogin = () => {
  const { url, method } = login.POST;
  const callApi = useAxios();
  return useMutation<ILoginResponce, string, ILoginRequest>(async (data) => {
    const response = await callApi({
      method,
      url,
      data,
    });
    return response as ILoginResponce;
  });
};
