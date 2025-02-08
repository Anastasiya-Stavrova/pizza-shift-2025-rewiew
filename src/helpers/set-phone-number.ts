const PHONE_MASK = "+7 xxx xxx xx xx";

export const getNumbers = (value: string): string => {
  return value.replace(/\D/g, "");
};

export const setPhoneNumber = (value: string): string => {
  const numbers: string[] = getNumbers(value).split("");

  if (numbers[0] === "7") {
    numbers.shift();
  }

  let numberIndex: number = 0;

  const formatedPhoneNumber: string = PHONE_MASK.split("")
    .map((char, index) => {
      if (index < 3) {
        return char;
      }

      if (numberIndex >= numbers.length) {
        return "";
      }

      if ([" "].includes(char)) {
        return char;
      }

      return numbers[numberIndex++];
    })
    .join("");

  return formatedPhoneNumber;
};
