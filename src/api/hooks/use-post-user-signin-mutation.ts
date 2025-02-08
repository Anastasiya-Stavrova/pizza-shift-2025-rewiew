import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { PostUserSigninRequestConfig, postUsersSignin } from "../requests/user";

export function usePostUserSigninMutation(
  settings?: MutationSettings<
    PostUserSigninRequestConfig,
    typeof postUsersSignin
  >
) {
  return useMutation({
    mutationKey: ["postUserSignin"],
    mutationFn: ({ params, config }) =>
      postUsersSignin({
        params,
        config: { ...settings?.config, ...config },
      }),
    onError: error => {
      console.log(error);
      toast.error("Не удалось войти", {
        icon: "❌",
      });
    },
    onSuccess: () => {
      toast.success("Авторизация прошла успешно!", {
        icon: "✅",
      });
    },
    ...settings?.options,
  });
}
