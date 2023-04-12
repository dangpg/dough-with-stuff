import { Button, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Pizza } from "../types/pizza";
import OrderItem from "./order-item";

interface Props {
  orders: Pizza[];
  activeOrderIdx: number;
  onNewOrderClick: () => void;
  onOrderItemClick: (idx: number) => void;
}

const OrderList = ({
  orders,
  activeOrderIdx,
  onNewOrderClick,
  onOrderItemClick,
}: Props) => {
  return (
    <VStack>
      {orders.map((order, i) => (
        <OrderItem
          key={i}
          isActive={activeOrderIdx === i}
          order={order}
          onOrderItemClick={() => onOrderItemClick(i)}
        />
      ))}
      <Button onClick={onNewOrderClick}>New Order</Button>
    </VStack>
  );
};

export default OrderList;
