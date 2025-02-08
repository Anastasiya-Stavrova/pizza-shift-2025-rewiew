import { instance } from "@/api/instance";

type GetUserSessionRequestConfig = RequestConfig;

export const getUserSession = async (params?: GetUserSessionRequestConfig) => {
  return instance.get<SessionResponse>("users/session", params?.config);
};
