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
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import ListItem from "../components/list-item";
import LoadingOverlay from "../components/loading-overlay";
import { usePizzaAPI } from "../hooks/usePizzaAPI";
import { PizzaDto } from "../types/pizza-dto";
import { ReactComponent as DWS } from "../assets/dws.svg";

const List = () => {
  const { getPizzas, pizzas, isPending, hasError, isDone } = usePizzaAPI();
  const [filteredPizzas, setFilteredPizzas] = useState<PizzaDto[]>();
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement | null>(null);

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

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      <Flex justifyContent="space-between" bg="primary.500" padding={2} gap={5}>
        <HStack>
          <Link to="/">
            <ChevronLeftIcon
              boxSize={6}
              aria-label="Back to Home"
              color="white"
            />
          </Link>
          <DWS height={40} />
          <Heading whiteSpace="nowrap" size="lg" color="white">
            List Orders
          </Heading>
        </HStack>
        <InputGroup maxW="md">
          <InputLeftElement pointerEvents="none">
            <SearchIcon />
          </InputLeftElement>
          <Input
            ref={inputRef}
            variant="filled"
            placeholder="Search"
            onChange={debouncedChangeHandler}
            _focusVisible={{ bg: "white" }}
          />

          <InputRightElement>
            <IconButton
              style={{ visibility: query.length === 0 ? "hidden" : "visible" }}
              onClick={handleClearQueryClick}
              aria-label="Clear Search Filter"
              icon={<CloseIcon />}
              size="sm"
            />
          </InputRightElement>
        </InputGroup>
        <Spacer />
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
