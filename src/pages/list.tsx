import { ChevronLeftIcon, RepeatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import ListItem from "../components/list-item";
import LoadingOverlay from "../components/loading-overlay";
import { usePizzaAPI } from "../hooks/usePizzaAPI";

const List = () => {
  const { getPizzas, pizzas, isPending, hasError, isDone } = usePizzaAPI();

  const handleRefreshClick = () => {
    getPizzas();
  };

  const handleOrderDeleted = useCallback(() => {
    getPizzas();
  }, [getPizzas]);

  useEffect(() => {
    if (pizzas) return;

    getPizzas();
  }, [getPizzas, pizzas]);

  return (
    <VStack alignItems="stretch">
      <Flex justifyContent="space-between" bg="blue.300" padding={2}>
        <HStack>
          <Link to="/">
            <ChevronLeftIcon boxSize={6} aria-label="Back to Home" />
          </Link>
          <Heading size="lg">List Orders</Heading>
        </HStack>
        <Button leftIcon={<RepeatIcon />} onClick={handleRefreshClick}>
          Refresh
        </Button>
      </Flex>
      {!isDone && (isPending || pizzas === undefined) && (
        <LoadingOverlay>Loading orders...</LoadingOverlay>
      )}
      {isDone && hasError && (
        <Center>
          <Text>There was an error while trying to fetch the orders.</Text>
        </Center>
      )}
      {isDone && !hasError && pizzas !== undefined && (
        <VStack alignItems="stretch" padding={2}>
          <Box>
            <Text>{`Number of orders: ${pizzas.length}`}</Text>
          </Box>
          <Grid
            gap={5}
            templateRows="repeat(2, 1fr)"
            templateColumns="repeat(3, 1fr)"
          >
            {pizzas.map((pizza) => (
              <GridItem key={pizza.Order_ID}>
                <ListItem pizza={pizza} onOrderDeleted={handleOrderDeleted} />
              </GridItem>
            ))}
          </Grid>
        </VStack>
      )}
    </VStack>
  );
};

export default List;
