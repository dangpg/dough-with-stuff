import { Box, Button, Flex, Text, useToast } from "@chakra-ui/react";
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
  onCancelOrder: () => void;
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

const Order = ({ tableNo, onCancelOrder }: Props) => {
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

  const handleUpdateOrder = useCallback(
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

  const handleSubmitOrder = () => {
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
      <Box height="100%">
        <Flex height="100%">
          <Flex minW="20%" maxW="20%" direction="column" bg="green">
            <Box flex={1} bg="blue">
              <Text>Table No.: {tableNo}</Text>
              <OrderList
                orders={orders}
                activeOrderIdx={activeOrderIdx ?? -1}
                onNewOrderClick={handleNewOrderClick}
                onOrderItemClick={handleOrderItemClick}
              />
            </Box>
            <Flex justifyContent="stretch">
              <Button colorScheme="red" flex={1} onClick={onCancelOrder}>
                Cancel
              </Button>
              <Button
                colorScheme="green"
                flex={1}
                onClick={handleSubmitOrder}
                isDisabled={
                  orders.length < 1 ||
                  orders.some((order) => checkIsOrderIncomplete(order))
                }
              >
                Submit
              </Button>
            </Flex>
          </Flex>
          <Box flex={1} bg="red">
            <Assemble
              key={activeOrderIdx}
              order={
                activeOrderIdx !== undefined
                  ? orders[activeOrderIdx]
                  : undefined
              }
              onUpdateOrder={handleUpdateOrder}
            />
          </Box>
        </Flex>
      </Box>
    </>
  );
};

export default Order;
