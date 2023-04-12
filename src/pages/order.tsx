import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useCallback, useState } from "react";
import Assemble from "../components/assemble";
import OrderList from "../components/order-list";
import { Pizza } from "../types/pizza";

interface Props {
  tableNo: number;
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

const Order = ({ tableNo }: Props) => {
  const [orders, setOrders] = useState<Pizza[]>([]);
  const [activeOrderIdx, setActiveOrderIdx] = useState<number | undefined>();

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

  return (
    <Box height="100vh">
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
          <Button>Submit Order</Button>
        </Flex>
        <Box flex={1} bg="red">
          <Assemble
            key={activeOrderIdx}
            order={
              activeOrderIdx !== undefined ? orders[activeOrderIdx] : undefined
            }
            onUpdateOrder={handleUpdateOrder}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Order;
