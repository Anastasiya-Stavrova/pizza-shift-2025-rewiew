import { getNumbers } from "./.";

const mapUserDataToMask = {
  PAN: "0000 0000",
  EXPIRE_DATE: "00/00",
  CVV: "0000",
  CODE: "000000",
} as const;

export type UserFormsType = keyof typeof mapUserDataToMask;

export const setFormsData = (type: UserFormsType, value: string): string => {
  const numbers: string[] = getNumbers(value).split("");

  let numberIndex: number = 0;

  const formatedPan: string = mapUserDataToMask[type]
    .split("")
    .map(char => {
      if (numberIndex >= numbers.length) {
        return "";
      }

      if ([" ", "/"].includes(char)) {
        return char;
      }

      return numbers[numberIndex++];
    })
    .join("");

  return formatedPan;
};
