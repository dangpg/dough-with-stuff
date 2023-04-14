import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Text,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  useDisclosure,
  Divider,
  Center,
} from "@chakra-ui/react";
import { Pizza } from "../types/pizza";
import { Cheese, Crust, Sauce, Size, Topping } from "../enums";
import { DeleteIcon } from "@chakra-ui/icons";
import { getAsset } from "../utils/get-asset";

interface Props {
  order?: Pizza;
  onOrderUpdate: (newOrder: Omit<Pizza, "tableNo">) => void;
  onOrderDelete: () => void;
}

const Assemble = ({ order, onOrderUpdate, onOrderDelete }: Props) => {
  const [size, setSize] = useState<Pizza["size"]>(order?.size);
  const [crust, setCrust] = useState<Pizza["crust"]>(order?.crust);
  const [sauce, setSauce] = useState<Pizza["flavor"]["sauce"]>(
    order?.flavor.sauce
  );
  const [cheese, setCheese] = useState<Pizza["flavor"]["cheese"]>(
    order?.flavor.cheese
  );
  const [vegetables, setVegetables] = useState<
    Pizza["flavor"]["toppings"]["vegetables"]
  >(order?.flavor.toppings.vegetables ?? []);
  const [meats, setMeats] = useState<Pizza["flavor"]["toppings"]["meats"]>(
    order?.flavor.toppings.meats ?? []
  );

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDeleteClick = () => {
    onOrderDelete();
  };

  useEffect(() => {
    const newOrder = {
      size,
      crust,
      flavor: {
        sauce,
        cheese,
        toppings: {
          vegetables,
          meats,
        },
      },
    };

    onOrderUpdate(newOrder);
  }, [crust, size, sauce, cheese, vegetables, meats, onOrderUpdate]);

  return (
    <>
      <Box p={4}>
        {order ? (
          <Flex direction="column" alignItems={"flex-start"} gap={5}>
            <Flex width="100%" justifyContent="space-between">
              <Box>
                <Heading size="md">1. Create Dough</Heading>
                <Text>Select the size and crust type:</Text>
              </Box>
              <IconButton
                colorScheme="dark"
                aria-label="Delete Order"
                size="lg"
                variant="solid"
                icon={<DeleteIcon />}
                onClick={onOpen}
              />
            </Flex>
            <Box>
              <FormControl isRequired>
                <FormLabel fontWeight="bold">Size</FormLabel>
              </FormControl>
              <Flex gap={4}>
                {Object.values(Size).map((s, i) => (
                  <Flex
                    key={i}
                    direction="column"
                    gap={3}
                    bg={s === size ? "secondary.500" : "gray.100"}
                    fontWeight={s === size ? "bold" : "normal"}
                    color={s === size ? "white" : "black"}
                    rounded="lg"
                    padding={1}
                    width="100px"
                    cursor="pointer"
                    outline={
                      s === size ? "2px solid black" : "2px solid transparent"
                    }
                    onClick={() => setSize(s === size ? undefined : s)}
                  >
                    <Center height="100px" padding={1}>
                      {getAsset({ key: s })}
                    </Center>
                    <Center>
                      <Text>{s}</Text>
                    </Center>
                  </Flex>
                ))}
              </Flex>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel fontWeight="bold">Crust</FormLabel>
              </FormControl>
              <Flex gap={4}>
                {Object.values(Crust).map((c, i) => (
                  <Flex
                    key={i}
                    direction="column"
                    gap={3}
                    bg={c === crust ? "secondary.500" : "gray.100"}
                    fontWeight={c === crust ? "bold" : "normal"}
                    color={c === crust ? "white" : "black"}
                    rounded="lg"
                    padding={1}
                    width="100px"
                    cursor="pointer"
                    outline={
                      c === crust ? "2px solid black" : "2px solid transparent"
                    }
                    onClick={() => setCrust(c === crust ? undefined : c)}
                  >
                    <Center height="100px" padding={1}>
                      {getAsset({ key: c })}
                    </Center>
                    <Center>
                      <Text>{c}</Text>
                    </Center>
                  </Flex>
                ))}
              </Flex>
            </Box>
            <Divider />
            <Box>
              <Heading size="md">2. Add Flavors</Heading>
              <Text>Select at least one topping:</Text>
            </Box>
            <Box>
              <FormControl>
                <FormLabel fontWeight="bold">Sauce (max. 1)</FormLabel>
              </FormControl>
              <Flex gap={4}>
                {Object.values(Sauce).map((s, i) => (
                  <Flex
                    key={i}
                    direction="column"
                    gap={3}
                    bg={s === sauce ? "secondary.500" : "gray.100"}
                    fontWeight={s === sauce ? "bold" : "normal"}
                    color={s === sauce ? "white" : "black"}
                    rounded="lg"
                    padding={1}
                    width="100px"
                    cursor="pointer"
                    outline={
                      s === sauce ? "2px solid black" : "2px solid transparent"
                    }
                    onClick={() => setSauce(s === sauce ? undefined : s)}
                  >
                    <Center height="100px" padding={1}>
                      {getAsset({ key: s })}
                    </Center>
                    <Center>
                      <Text>{s}</Text>
                    </Center>
                  </Flex>
                ))}
              </Flex>
            </Box>
            <Box>
              <FormControl>
                <FormLabel fontWeight="bold">Cheese (max. 1)</FormLabel>
              </FormControl>
              <Flex gap={4}>
                {Object.values(Cheese).map((c, i) => (
                  <Flex
                    key={i}
                    direction="column"
                    gap={3}
                    bg={c === cheese ? "secondary.500" : "gray.100"}
                    fontWeight={c === cheese ? "bold" : "normal"}
                    color={c === cheese ? "white" : "black"}
                    rounded="lg"
                    padding={1}
                    width="100px"
                    cursor="pointer"
                    outline={
                      c === cheese ? "2px solid black" : "2px solid transparent"
                    }
                    onClick={() => setCheese(c === cheese ? undefined : c)}
                  >
                    <Center height="100px" padding={1}>
                      {getAsset({ key: c })}
                    </Center>
                    <Center>
                      <Text>{c}</Text>
                    </Center>
                  </Flex>
                ))}
              </Flex>
            </Box>
            <Box>
              <FormControl>
                <FormLabel fontWeight="bold">Vegetables</FormLabel>
              </FormControl>
              <Flex gap={4}>
                {Object.values(Topping.Vegetables).map((v, i) => (
                  <Flex
                    key={i}
                    direction="column"
                    gap={3}
                    bg={vegetables.includes(v) ? "secondary.500" : "gray.100"}
                    fontWeight={vegetables.includes(v) ? "bold" : "normal"}
                    color={vegetables.includes(v) ? "white" : "black"}
                    rounded="lg"
                    padding={1}
                    width="100px"
                    cursor="pointer"
                    outline={
                      vegetables.includes(v)
                        ? "2px solid black"
                        : "2px solid transparent"
                    }
                    onClick={() =>
                      setVegetables((prevVeg) =>
                        prevVeg.includes(v)
                          ? prevVeg.filter((veg) => veg !== v)
                          : [...prevVeg, v]
                      )
                    }
                  >
                    <Center height="100px" padding={1}>
                      {getAsset({ key: v })}
                    </Center>
                    <Center>
                      <Text>{v}</Text>
                    </Center>
                  </Flex>
                ))}
              </Flex>
            </Box>
            <Box>
              <FormControl>
                <FormLabel fontWeight="bold">Meats</FormLabel>
              </FormControl>
              <Flex gap={4}>
                {Object.values(Topping.Meats).map((m, i) => (
                  <Flex
                    key={i}
                    direction="column"
                    gap={3}
                    bg={meats.includes(m) ? "secondary.500" : "gray.100"}
                    fontWeight={meats.includes(m) ? "bold" : "normal"}
                    color={meats.includes(m) ? "white" : "black"}
                    rounded="lg"
                    padding={1}
                    width="100px"
                    cursor="pointer"
                    outline={
                      meats.includes(m)
                        ? "2px solid black"
                        : "2px solid transparent"
                    }
                    onClick={() =>
                      setMeats((prevMeat) =>
                        prevMeat.includes(m)
                          ? prevMeat.filter((meat) => meat !== m)
                          : [...prevMeat, m]
                      )
                    }
                  >
                    <Center height="100px" padding={1}>
                      {getAsset({ key: m })}
                    </Center>
                    <Center>
                      <Text>{m}</Text>
                    </Center>
                  </Flex>
                ))}
              </Flex>
            </Box>
          </Flex>
        ) : (
          <Text>Please select or create an order</Text>
        )}
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{`Are you sure you want to delete the current order?`}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="primary"
              onClick={() => {
                onClose();
                handleDeleteClick();
              }}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Assemble;
