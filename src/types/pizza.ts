import { Cheese, Crust, Sauce, Size, Topping } from "../enums";

export interface Pizza {
  tableNo: number;
  crust?: typeof Crust[keyof typeof Crust];
  size?: typeof Size[keyof typeof Size];
  flavor: {
    sauce?: typeof Sauce[keyof typeof Sauce];
    cheese?: typeof Cheese[keyof typeof Cheese];
    toppings: {
      vegetables: typeof Topping.Vegetables[number][];
      meats: typeof Topping.Meats[number][];
    };
  };
}
