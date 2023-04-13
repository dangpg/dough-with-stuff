import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Flex,
  IconButton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { PizzaDto } from "../types/pizza-dto";
import { formatTimestamp } from "../utils";

interface Props {
  pizza: PizzaDto;
}

const ListItem = ({ pizza }: Props) => {
  const { Order_ID, Timestamp, Table_No, Size, Crust, Flavor } = pizza;

  return (
    <Card>
      <CardHeader bg="green.300">
        <VStack alignItems="stretch">
          <Flex alignItems="center">
            <Text flex={1}>{formatTimestamp(Timestamp)}</Text>
            <Text
              flex={1}
              fontWeight="bold"
              textAlign="center"
            >{`#${Order_ID}`}</Text>
            <Flex flex={1} justifyContent="flex-end">
              <IconButton
                colorScheme="red"
                aria-label="Delete Order"
                size="sm"
                icon={<DeleteIcon />}
              />
            </Flex>
          </Flex>
          <Flex justifyContent="space-between">
            <Text>{`Table ${Table_No}`}</Text>
            <Text>{Size}</Text>
          </Flex>
        </VStack>
      </CardHeader>
      <CardBody>
        <VStack alignItems="stretch">
          <Box bg="gray.200" padding={2}>
            <Text fontWeight="bold">Crust</Text>
          </Box>
          <Box padding={2}>
            <Text>{Crust}</Text>
          </Box>
          <Box bg="gray.200" padding={2}>
            <Text fontWeight="bold">Flavor</Text>
          </Box>
          <Box padding={2}>
            <Text>{Flavor}</Text>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ListItem;
