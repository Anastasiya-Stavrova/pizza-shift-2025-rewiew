import { zodResolver } from "@hookform/resolvers/zod";

import { AuthStage } from "../_components";
import { authFullSchema, authPartialSchema } from "../_constants";

export const getAuthFormOptions = (stage: AuthStage, phone: string) => {
  const formOptions =
    stage === "PHONE_STAGE"
      ? {
          resolver: zodResolver(authPartialSchema),
          defaultValues: {
            phone,
          },
        }
      : {
          resolver: zodResolver(authFullSchema),
          defaultValues: {
            phone,
            code: "",
          },
        };

  return formOptions;
};
