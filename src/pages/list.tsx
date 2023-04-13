import {
  ChevronLeftIcon,
  CloseIcon,
  RepeatIcon,
  SearchIcon,
} from "@chakra-ui/icons";
import debounce from "lodash.debounce";
import {
  Box,
  Button,
  Center,
  Flex,
  Grid,
  GridItem,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ListItem from "../components/list-item";
import LoadingOverlay from "../components/loading-overlay";
import { usePizzaAPI } from "../hooks/usePizzaAPI";
import { PizzaDto } from "../types/pizza-dto";

const List = () => {
  const { getPizzas, pizzas, isPending, hasError, isDone } = usePizzaAPI();
  const [filteredPizzas, setFilteredPizzas] = useState<PizzaDto[]>();
  const [query, setQuery] = useState("");

  const handleRefreshClick = () => {
    getPizzas();
  };

  const handleOrderDeleted = useCallback(() => {
    getPizzas();
  }, [getPizzas]);

  const handleQueryChange = (query: string) => {
    setQuery(query);
  };

  const handleClearQueryClick = () => {
    setQuery("");
  };

  const debouncedChangeHandler = useCallback(
    debounce(
      (event: React.ChangeEvent<HTMLInputElement>) =>
        handleQueryChange(event.target.value),
      500
    ),
    []
  );

  useEffect(() => {
    if (pizzas === undefined) return;

    if (query === "") {
      setFilteredPizzas(pizzas);
    }

    const newPizzas = pizzas.filter((pizza) =>
      JSON.stringify(pizza).toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPizzas(newPizzas);
  }, [pizzas, query]);

  useEffect(() => {
    if (pizzas) return;

    getPizzas();
  }, [getPizzas, pizzas]);

  return (
    <VStack alignItems="stretch">
      <Flex justifyContent="space-between" bg="blue.300" padding={2} gap={5}>
        <HStack>
          <Link to="/">
            <ChevronLeftIcon boxSize={6} aria-label="Back to Home" />
          </Link>
          <Heading whiteSpace="nowrap" size="lg">
            List Orders
          </Heading>
        </HStack>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input
            bg="white"
            variant="filled"
            placeholder="Search order"
            onChange={debouncedChangeHandler}
          />

          <InputRightElement>
            <IconButton
              isDisabled={query.length === 0}
              onClick={handleClearQueryClick}
              aria-label="Clear Search Filter"
              icon={<CloseIcon />}
              size="sm"
            />
          </InputRightElement>
        </InputGroup>
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
      {isDone &&
        !hasError &&
        pizzas !== undefined &&
        filteredPizzas !== undefined && (
          <VStack alignItems="stretch" padding={2}>
            <Box>
              <Text>{`# Orders shown: ${filteredPizzas.length}${
                filteredPizzas.length !== pizzas.length
                  ? ` out of ${pizzas.length}`
                  : ""
              }`}</Text>
            </Box>
            <Grid
              gap={5}
              templateRows="repeat(2, 1fr)"
              templateColumns="repeat(3, 1fr)"
            >
              {filteredPizzas.map((pizza) => (
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
