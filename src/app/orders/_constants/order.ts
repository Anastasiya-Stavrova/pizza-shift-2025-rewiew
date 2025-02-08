export const mapOrderTypeToName = {
  ACTIVE: "Активные",
  HISTORY: "История",
} as const;

export const orderTypeNames = Object.entries(mapOrderTypeToName).map(
  ([value, name]) => ({
    name,
    value,
  })
);

export type OrderTypeName = keyof typeof mapOrderTypeToName;

export const mapOrderStatusToDescription = {
  0: "Заказ оформлен",
  1: "Заказ ждет курьера",
  2: "Заказ в пути",
  3: "Заказ доставлен",
  4: "Заказ отменен",
} as const;

export const mapOrderStatusToColor = {
  0: "#FFB219",
  1: "#E2A4FF",
  2: "#4C94FF",
  3: "#40BF7F",
  4: "#F64C4C",
} as const;

export const orderStatusNames = Object.entries(mapOrderStatusToDescription).map(
  ([value, name]) => ({
    name,
    value,
  })
);

export type OrderStatusName = keyof typeof mapOrderStatusToDescription;
