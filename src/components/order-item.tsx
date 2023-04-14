import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { Pizza } from "../types/pizza";
import { transformPizzaToDto } from "../utils";

interface Props {
  order: Pizza;
  orderIdx: number;
  isActive: boolean;
  isComplete: boolean;
  onOrderItemClick: () => void;
}

const OrderItem = ({
  order,
  orderIdx,
  isActive,
  isComplete,
  onOrderItemClick,
}: Props) => {
  const { Size, Crust, Flavor } = transformPizzaToDto(order);

  return (
    <Box
      border={isActive ? "2px double" : "2px solid transparent"}
      width="100%"
      minH={100}
      onClick={onOrderItemClick}
      padding={1}
      bg={isComplete ? "green.300" : "red.300"}
    >
      <HStack alignItems="flex-start">
        <Text>{orderIdx + 1}.</Text>
        <VStack align="flex-start">
          <Text>Size: {Size}</Text>
          <Text>Crust: {Crust}</Text>
          <Text>Flavor: {Flavor}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default OrderItem;
