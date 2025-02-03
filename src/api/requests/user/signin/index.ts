import { instance } from "@/api/instance";

export type PostUserSigninRequestConfig = RequestConfig<SignInDto>;

export async function postUsersSignin({
  params,
  config,
}: PostUserSigninRequestConfig) {
  return instance.post<SigninResponse>("users/signin", params, config);
}
