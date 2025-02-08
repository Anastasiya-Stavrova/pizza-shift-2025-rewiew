import { instance } from "@/api/instance";

export type PostUserSigninRequestConfig = RequestConfig<SignInDto>;

export const postUsersSignin = async ({
  params,
  config,
}: PostUserSigninRequestConfig) => {
  return instance.post<SigninResponse>("users/signin", params, config);
};
