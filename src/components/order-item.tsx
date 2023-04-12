import { Box, Text, VStack } from "@chakra-ui/react";
import { Pizza } from "../types/pizza";
import { transformPizzaToDto } from "../utils";

interface Props {
  order: Pizza;
  isActive: boolean;
  onOrderItemClick: () => void;
}

const OrderItem = ({ order, isActive, onOrderItemClick }: Props) => {
  const { Size, Crust, Flavor } = transformPizzaToDto(order);

  return (
    <Box
      border={isActive ? "1px" : "none"}
      width="100%"
      minH={100}
      onClick={onOrderItemClick}
      padding={1}
    >
      <VStack align="flex-start">
        <Text>Size: {Size}</Text>
        <Text>Crust: {Crust}</Text>
        <Text>Flavor: {Flavor}</Text>
      </VStack>
    </Box>
  );
};

export default OrderItem;
