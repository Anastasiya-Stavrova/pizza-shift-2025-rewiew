export const mapPizzaNameToSize = {
  Маленькая: "SMALL",
  Средняя: "MEDIUM",
  Большая: "LARGE",
} as const;

export const mapPizzaSizeToName = {
  SMALL: "Маленькая",
  MEDIUM: "Средняя",
  LARGE: "Большая",
} as const;

export const mapPizzaSizeToNumber = {
  SMALL: 25,
  MEDIUM: 30,
  LARGE: 35,
} as const;

export const mapPizzaNumberToSize = {
  25: "SMALL",
  30: "MEDIUM",
  35: "LARGE",
} as const;
