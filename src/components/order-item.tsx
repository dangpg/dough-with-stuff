import { Box, Text, VStack } from "@chakra-ui/react";
import { Pizza } from "../types/pizza";
import { transformPizzaToDto } from "../utils";

interface Props {
  order: Pizza;
  isActive: boolean;
  isComplete: boolean;
  onOrderItemClick: () => void;
}

const OrderItem = ({
  order,
  isActive,
  isComplete,
  onOrderItemClick,
}: Props) => {
  const { Size, Crust, Flavor } = transformPizzaToDto(order);

  return (
    <Box
      border={isActive ? "2px" : "2px solid transparent"}
      width="100%"
      minH={100}
      onClick={onOrderItemClick}
      padding={1}
      bg={isComplete ? "green.400" : "red.400"}
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
