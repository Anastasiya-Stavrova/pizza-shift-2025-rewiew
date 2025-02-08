import { zodResolver } from "@hookform/resolvers/zod";

import { authFullSchema, authPartialSchema } from "../_constants";
import { AuthStage } from "../_components";

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
