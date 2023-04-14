import { Divider, Flex } from "@chakra-ui/react";
import { Pizza } from "../types/pizza";
import { checkIsOrderComplete } from "../utils";
import OrderItem from "./order-item";

interface Props {
  orders: Pizza[];
  activeOrderIdx: number;
  onOrderItemClick: (idx: number) => void;
}

const OrderList = ({ orders, activeOrderIdx, onOrderItemClick }: Props) => {
  return (
    <Flex direction="column">
      {orders.map((order, i) => (
        <>
          <OrderItem
            key={i}
            isActive={activeOrderIdx === i}
            order={order}
            orderIdx={i}
            onOrderItemClick={() => onOrderItemClick(i)}
            isComplete={checkIsOrderComplete(order)}
          />
          <Divider />
        </>
      ))}
    </Flex>
  );
};

export default OrderList;
