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

const testDelete = async (orderId: number) => {
  return new Promise((resolve, reject) =>
    setTimeout(() => {
      console.log(`Deleted order ${orderId}`);
      resolve(undefined);
      // reject();
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
      let requests;
      if (import.meta.env.VITE_USE_DUMMY_API) {
        requests = pizzas.map((pizza) => testOrder(pizza));
      } else {
        requests = pizzas.map((pizza) =>
          PizzaClient.orders.ordersCreate(pizza)
        );
      }

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
      let pizzas;
      if (import.meta.env.VITE_USE_DUMMY_API) {
        pizzas = await testRead();
      } else {
        pizzas = await PizzaClient.orders.ordersReadAll();
      }

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

  const deletePizza = useCallback(async (orderId: number) => {
    setIsDone(false);
    setIsPending(true);
    setHasError(false);

    try {
      if (import.meta.env.VITE_USE_DUMMY_API) {
        await testDelete(orderId);
      } else {
        await PizzaClient.orders.ordersDelete(orderId);
      }

      setIsDone(true);
    } catch {
      setHasError(true);
      setIsDone(true);
    } finally {
      setIsPending(false);
    }
  }, []);

  return {
    isPending,
    hasError,
    submitPizzas,
    isDone,
    getPizzas,
    pizzas,
    deletePizza,
  };
};
