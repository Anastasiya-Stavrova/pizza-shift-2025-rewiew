import { useQuery } from "@tanstack/react-query";

import { getUserSession } from "../requests/user";

export const useGetUsersSessionQuery = (
  settings?: QuerySettings<typeof getUserSession>
) => {
  return useQuery({
    queryKey: ["getUserSession"],
    queryFn: () => getUserSession({ config: settings?.config }),
    ...settings?.options,
  });
};
