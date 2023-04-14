import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Assemble from "./assemble";
import LoadingOverlay from "./loading-overlay";
import OrderList from "./order-list";
import { usePizzaAPI } from "../hooks/usePizzaAPI";
import { Pizza } from "../types/pizza";
import { checkIsOrderIncomplete, transformPizzaToDto } from "../utils";

interface Props {
  tableNo: number;
  onOrderCancel: () => void;
}

const createNewOrder = ({ tableNo }: { tableNo: number }): Pizza => ({
  tableNo,
  crust: undefined,
  size: undefined,
  flavor: {
    sauce: undefined,
    cheese: undefined,
    toppings: {
      vegetables: [],
      meats: [],
    },
  },
});

const Order = ({ tableNo, onOrderCancel }: Props) => {
  const navigate = useNavigate();
  const { isPending, submitPizzas, hasError, isDone } = usePizzaAPI();

  const toast = useToast();

  const [orders, setOrders] = useState<Pizza[]>([createNewOrder({ tableNo })]);
  const [activeOrderIdx, setActiveOrderIdx] = useState<number | undefined>(0);

  const handleNewOrderClick = useCallback(() => {
    const newOrder = createNewOrder({ tableNo });
    const newOrders = [...orders, newOrder];

    setActiveOrderIdx(newOrders.length - 1);
    setOrders(newOrders);
  }, [orders, tableNo]);

  const handleOrderItemClick = useCallback((idx: number) => {
    setActiveOrderIdx(idx);
  }, []);

  const handleOrderUpdate = useCallback(
    (newOrder: Omit<Pizza, "tableNo">) => {
      console.log(newOrder);

      setOrders((prevOrders) =>
        prevOrders.map((order, idx) => {
          if (idx === activeOrderIdx) {
            return { tableNo: order.tableNo, ...newOrder };
          }

          return order;
        })
      );
    },
    [activeOrderIdx]
  );

  const handleOrderDelete = useCallback(() => {
    if (activeOrderIdx === undefined) return;

    setOrders((prevOrders) =>
      prevOrders.filter((_, idx) => {
        return idx !== activeOrderIdx;
      })
    );

    setActiveOrderIdx(
      activeOrderIdx === 0 && orders.length > 1 ? 0 : activeOrderIdx - 1
    );
  }, [activeOrderIdx, orders]);

  const handleOrderSubmit = () => {
    const ordersToSubmit = orders.map((order) => transformPizzaToDto(order));

    submitPizzas(ordersToSubmit);
  };

  useEffect(() => {
    if (!isDone) return;

    toast({
      title: "Order submitted.",
      description: "Successfully sent the order to the Pizza API.",
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    navigate("/");
  }, [isDone, toast, navigate]);

  useEffect(() => {
    if (!hasError) return;

    toast({
      title: "Unexpected error.",
      description:
        "An error occurred while sending the order. Please try again.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }, [hasError, toast]);

  return (
    <>
      {isPending && <LoadingOverlay>Submitting Order</LoadingOverlay>}
      <Flex height="100%">
        <Flex minW="20%" maxW="20%" direction="column">
          <Flex flex={1} height={0} direction="column">
            <Center padding={3}>
              <Text fontSize="2xl">Table #{tableNo}</Text>
            </Center>
            <Button onClick={handleNewOrderClick}>New Order</Button>
            <Divider />
            <Box flex={1} height={0} overflow="auto">
              <OrderList
                orders={orders}
                activeOrderIdx={activeOrderIdx ?? -1}
                onOrderItemClick={handleOrderItemClick}
              />
            </Box>
          </Flex>
          <Flex justifyContent="stretch">
            <Button
              rounded="none"
              colorScheme="red"
              size="lg"
              flex={1}
              onClick={onOrderCancel}
            >
              Cancel
            </Button>
            <Button
              rounded="none"
              size="lg"
              colorScheme="green"
              flex={1}
              onClick={handleOrderSubmit}
              isDisabled={
                orders.length < 1 ||
                orders.some((order) => checkIsOrderIncomplete(order))
              }
            >
              Submit
            </Button>
          </Flex>
        </Flex>
        <Box flex={1} overflow="auto">
          <Assemble
            key={activeOrderIdx}
            order={
              activeOrderIdx !== undefined ? orders[activeOrderIdx] : undefined
            }
            onOrderUpdate={handleOrderUpdate}
            onOrderDelete={handleOrderDelete}
          />
        </Box>
      </Flex>
    </>
  );
};

export default Order;
