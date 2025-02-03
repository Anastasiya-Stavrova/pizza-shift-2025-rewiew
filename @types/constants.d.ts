const mapPizzaIngredientsToName = {
  PINEAPPLE: "сочные ананасы",
  MOZZARELLA: "сливочная моцарелла",
  PEPERONI: "пикантная пепперони",
  GREEN_PEPPER: "сладкий перец",
  MUSHROOMS: "шампиньоны",
  BASIL: "итальянские травы",
  CHEDDAR: "сыр чеддер",
  PARMESAN: "сыр пармезан",
  FETA: "кубики феты",
  HAM: "ветчина",
  PICKLE: "маринованные огурчики",
  TOMATO: "свежие томаты",
  BACON: "бекон",
  ONION: "лук",
  CHILE: "острый перец халапеньо",
  SHRIMPS: "креветки",
  CHICKEN_FILLET: "куриное филе",
  MEATBALLS: "митболы",
} as const;

const mapOrderTypeToName = {
  ACTIVE: "Активные",
  HISTORY: "История",
} as const;

const mapOrderStatusToDescription = {
  0: "Заказ оформлен",
  1: "Заказ ждет курьера",
  2: "Заказ в пути",
  3: "Заказ доставлен",
  4: "Заказ отменен",
} as const;

const mapOrderStatusToColor = {
  0: "#FFB219",
  1: "#E2A4FF",
  2: "#4C94FF",
  3: "#40BF7F",
  4: "#F64C4C",
} as const;

const mapPizzaNameToSize = {
  Маленькая: "SMALL",
  Средняя: "MEDIUM",
  Большая: "LARGE",
} as const;

const mapPizzaSizeToName = {
  SMALL: "Маленькая",
  MEDIUM: "Средняя",
  LARGE: "Большая",
} as const;

const mapPizzaSizeToNumber = {
  SMALL: 25,
  MEDIUM: 30,
  LARGE: 35,
} as const;

const mapPizzaNumberToSize = {
  25: "SMALL",
  30: "MEDIUM",
  35: "LARGE",
} as const;
