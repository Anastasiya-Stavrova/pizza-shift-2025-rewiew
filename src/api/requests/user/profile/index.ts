import { instance } from "@/api/instance";

export type PatchUserProfileRequestConfig = RequestConfig<UpdateProfileDto>;

export const patchUserProfile = async ({
  params,
  config,
}: PatchUserProfileRequestConfig) => {
  return instance.patch<UpdateProfileResponse>("users/profile", params, config);
};
