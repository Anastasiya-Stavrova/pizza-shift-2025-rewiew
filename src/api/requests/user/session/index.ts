import { instance } from "@/api/instance";

export type GetUserSessionRequestConfig = RequestConfig;

export async function getUserSession(params?: GetUserSessionRequestConfig) {
  return instance.get<SessionResponse>("users/session", params?.config);
}
