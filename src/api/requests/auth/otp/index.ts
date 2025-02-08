import { instance } from "@/api/instance";

export type PostAuthOtpRequestConfig = RequestConfig<CreateOtpDto>;

export const postAuthOtp = async ({
  params,
  config,
}: PostAuthOtpRequestConfig) => {
  return instance.post<OtpResponse>("auth/otp", params, config);
};
