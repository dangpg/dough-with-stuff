import { Pizza } from "../types/pizza";
import { PizzaDto } from "../types/pizza-dto";

type RequireKeys<T extends object, K extends keyof T> = Required<Pick<T, K>> &
  Omit<T, K>;

export const transformPizzaToDto = ({
  tableNo,
  size,
  crust,
  flavor: {
    sauce,
    cheese,
    toppings: { vegetables, meats },
  },
}: Pizza): PizzaDto => ({
  Table_No: tableNo,
  Size: size!,
  Crust: crust!,
  Flavor: [
    sauce,
    cheese,
    vegetables.length > 0 ? vegetables.join(", ") : undefined,
    meats.length > 0 ? meats.join(", ") : undefined,
  ]
    .filter(Boolean)
    .join(", "),
});

export const checkIsOrderIncomplete = ({ size, crust }: Pizza): boolean => {
  if (size === undefined || crust === undefined) return true;

  return false;
};

export const checkIsOrderComplete = (order: Pizza): boolean =>
  !checkIsOrderIncomplete(order);
