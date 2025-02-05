"use client";

import { useFormContext } from "react-hook-form";

import { cn } from "@/lib";
import { setFormsData, setPhoneNumber } from "@/helpers";

import { ErrorText, RequiredSymbol, Input } from "@/components";

const mapUserDataNameToType = {
  pan: "PAN",
  expireDate: "EXPIRE_DATE",
  cvv: "CVV",
  code: "CODE",
} as const;

type FormInputProps = {
  name: string;
  label?: string;
  required?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FormInput = ({
  name,
  label,
  required,
  className,
  ...props
}: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const errorText = errors[name]?.message as string;

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <RequiredSymbol />}
        </p>
      )}

      <div className="relative">
        <Input
          className={cn("h-12 text-md", {
            "border-2 border-[#F64C4C]": errorText,
          })}
          {...register(name)}
          {...props}
          {...(name === "phone" && {
            onInput: (event: React.ChangeEvent<HTMLInputElement>) => {
              event.target.value = setPhoneNumber(event.target.value);
            },
          })}
          {...(["pan", "expireDate", "cvv", "code"].includes(name) && {
            onInput: (event: React.ChangeEvent<HTMLInputElement>) => {
              const key = name as keyof typeof mapUserDataNameToType;
              event.target.value = setFormsData(
                mapUserDataNameToType[key],
                event.target.value
              );
            },
          })}
        />
      </div>

      {errorText && <ErrorText text={errorText} className="mt-2" />}
    </div>
  );
};
