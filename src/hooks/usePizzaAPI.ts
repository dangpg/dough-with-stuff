import { useCallback, useState } from "react";
import { PizzaDto } from "../types/pizza-dto";
import { PizzaClient } from "../utils/pizza-client";

const testOrder = async (pizza: PizzaDto) => {
  console.log("Ordering Pizza " + JSON.stringify(pizza));

  return new Promise((resolve, reject) =>
    setTimeout(() => {
      console.log("Finished Pizza " + JSON.stringify(pizza));
      resolve(undefined);
      // reject();
    }, Math.floor(Math.random() * 4000) + 1000)
  );
};

export const usePizzaAPI = () => {
  const [isPending, setIsPending] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const submitPizzas = useCallback(async (pizzas: PizzaDto[]) => {
    setIsDone(false);
    setIsPending(true);
    setHasError(false);

    try {
      const requests = pizzas.map((pizza) =>
        PizzaClient.orders.ordersCreate(pizza)
      );

      // const requests = pizzas.map((pizza) => testOrder(pizza));

      await Promise.all(requests);

      setIsDone(true);
    } catch {
      setHasError(true);
    } finally {
      setIsPending(false);
    }
  }, []);

  return { isPending, hasError, submitPizzas, isDone };
};
