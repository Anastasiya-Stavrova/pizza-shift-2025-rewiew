import { instance } from "@/api/instance";

export type PatchUserProfileRequestConfig = RequestConfig<UpdateProfileDto>;

export async function patchUserProfile({
  params,
  config,
}: PatchUserProfileRequestConfig) {
  return instance.patch<UpdateProfileResponse>("users/profile", params, config);
}
