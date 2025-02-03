import { useQuery } from "@tanstack/react-query";
import { Api } from "../api-client";

export const useGetUsersSessionQuery = (
  settings?: QuerySettings<typeof Api.user.getUserSession>
) => {
  return useQuery({
    queryKey: ["getUserSession"],
    queryFn: () => Api.user.getUserSession({ config: settings?.config }),
    ...settings?.options,
  });
};
