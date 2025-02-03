import {
  mapPizzaSizeToName,
  mapPizzaIngredientsToName,
  mapOrderStatusToDescription,
} from "../src/constants";

type PizzaSizeName = keyof typeof mapPizzaSizeToName;

type PizzaIngredientName = keyof typeof mapPizzaIngredientsToName;

type OrderStatus = keyof typeof mapOrderStatusToDescription;

interface PizzaSize {
  name: PizzaSizeName;
  price: number;
}

interface PizzaDough {
  name: "THIN" | "THICK";
  price: number;
}

interface OrderedPizzaIngredient {
  name: IngredientName;
  cost: number;
}

interface PizzaIngredient extends OrderedPizzaIngredient {
  img: string;
}

interface Pizza {
  id: string;
  name: string;
  description: string;
  img: string;
  doughs: PizzaDough[];
  ingredients: PizzaIngredient[];
  toppings: PizzaIngredient[];
  sizes: PizzaSize[];
  isNew: boolean;
  isHit: boolean;
  calories: number;
  protein: string;
  totalFat: string;
  carbohydrates: string;
  sodium: string;
  allergens: string[];
  isVegetarian: boolean;
  isGlutenFree: boolean;
}

interface ReceiverAddress {
  street: string;
  house: string;
  apartment: string;
  comment?: string;
}

interface Person {
  firstname: string;
  lastname: string;
  middlename?: string;
  phone: string;
}

interface OrderedPizza {
  id: string;
  name: string;
  toppings: OrderedPizzaIngredient[];
  size: PizzaSize;
  doughs: PizzaDough;
}

interface CreatePizzaPaymentDto {
  receiverAddress: ReceiverAddress;
  person: Person;
  debitCard: {
    pan: string;
    expireDate: string;
    cvv: string;
  };
  pizzas: OrderedPizza[];
}

interface PizzaOrder {
  _id: string;
  pizzas: OrderedPizza[];
  person: Person;
  receiverAddress: ReceiverAddress;
  status: OrderStatus;
  cancellable: boolean;
}

interface CancelPizzaOrderDto {
  orderId: string;
}

interface BaseResponse {
  success: boolean;
  reason: string;
}

type PizzasResponse = BaseResponse & {
  catalog: Pizza[];
};

type PizzaPaymentResponse = BaseResponse & {
  oreder: PizzaOrder;
};

type PizzaOrdersResponse = BaseResponse & {
  orders: PizzaOrder[];
};

type PizzaOrderResponse = PizzaPaymentResponse;
