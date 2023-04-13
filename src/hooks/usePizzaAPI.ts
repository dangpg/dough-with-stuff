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

const testRead = async () => {
  return new Promise<PizzaDto[]>((resolve, reject) =>
    setTimeout(() => {
      console.log("Read pizzas");

      // reject();
      resolve([
        {
          Crust: "NORMAL",
          Flavor: "BEEF-NORMAL",
          Order_ID: 1,
          Size: "M",
          Table_No: 1,
          Timestamp: "2019-12-03T18:21:08.669365",
        },
        {
          Crust: "THIN",
          Flavor: "CHEESE",
          Order_ID: 2,
          Size: "S",
          Table_No: 5,
          Timestamp: "2019-12-03T18:21:08.708470",
        },
        {
          Crust: "NORMAL",
          Flavor: "CHICKEN-FAJITA",
          Order_ID: 3,
          Size: "L",
          Table_No: 3,
          Timestamp: "2019-12-03T18:21:08.710006",
        },
      ]);
    }, Math.floor(Math.random() * 1000) + 500)
  );
};

export const usePizzaAPI = () => {
  const [isPending, setIsPending] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [pizzas, setPizzas] = useState<PizzaDto[] | undefined>();

  const submitPizzas = useCallback(async (pizzas: PizzaDto[]) => {
    setIsDone(false);
    setIsPending(true);
    setHasError(false);

    try {
      // const requests = pizzas.map((pizza) =>
      //   PizzaClient.orders.ordersCreate(pizza)
      // );

      const requests = pizzas.map((pizza) => testOrder(pizza));

      await Promise.all(requests);

      setIsDone(true);
    } catch {
      setHasError(true);
      setIsDone(true);
    } finally {
      setIsPending(false);
    }
  }, []);

  const getPizzas = useCallback(async () => {
    setIsDone(false);
    setIsPending(true);
    setHasError(false);
    setPizzas(undefined);

    try {
      // const pizzas = await PizzaClient.orders.ordersReadAll();
      const pizzas = await testRead();

      setIsDone(true);
      setPizzas(pizzas);
    } catch {
      setHasError(true);
      setPizzas(undefined);
      setIsDone(true);
    } finally {
      setIsPending(false);
    }
  }, []);

  return { isPending, hasError, submitPizzas, isDone, getPizzas, pizzas };
};
