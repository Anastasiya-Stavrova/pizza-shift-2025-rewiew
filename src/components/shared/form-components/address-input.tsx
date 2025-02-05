"use client";

import React from "react";
import { AddressSuggestions } from "react-dadata";

import { DADATA_TOKEN } from "../../../../env";

import "react-dadata/dist/react-dadata.css";

interface AddressInputProps {
  value?: string;
  className?: string;
  onChange?: (value?: string) => void;
}

export const AddressInput = ({
  value,
  className,
  onChange,
}: AddressInputProps) => {
  const id = React.useId();

  return (
    <AddressSuggestions
      inputProps={{
        onInput: (event: React.ChangeEvent<HTMLInputElement>) => {
          onChange?.(event.target.value);
        },
        className: `flex h-12 py-2 px-3 w-full rounded-[8px] border border-input hover:border-[#97A1AF] focus:border-[#4C94FF] focus:border-2 bg-white text-base font-normal transition-colors placeholder:text-muted-foreground focus-visible:outline-none ${className}`,
      }}
      defaultQuery={value}
      token={DADATA_TOKEN}
      count={5}
      onChange={data => onChange?.(data?.value)}
      uid={id}
    />
  );
};
