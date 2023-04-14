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
} from "@chakra-ui/react";
import { Pizza } from "../types/pizza";
import { Cheese, Crust, Sauce, Size, Topping } from "../enums";
import { DeleteIcon } from "@chakra-ui/icons";

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
                <Heading size="md">Assemble Pizza</Heading>
              </Box>
              <IconButton
                colorScheme="red"
                aria-label="Delete Order"
                size="sm"
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
                  <Button
                    key={i}
                    variant={s === size ? "solid" : "outline"}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </Button>
                ))}
              </Flex>
            </Box>
            <Box>
              <FormControl isRequired>
                <FormLabel fontWeight="bold">Crust</FormLabel>
              </FormControl>
              <Flex gap={4}>
                {Object.values(Crust).map((c, i) => (
                  <Button
                    key={i}
                    variant={c === crust ? "solid" : "outline"}
                    onClick={() => setCrust(c)}
                  >
                    {c}
                  </Button>
                ))}
              </Flex>
            </Box>
            <Box>
              <FormControl>
                <FormLabel fontWeight="bold">Sauce</FormLabel>
              </FormControl>
              <Flex gap={4}>
                {Object.values(Sauce).map((s, i) => (
                  <Button
                    key={i}
                    variant={s === sauce ? "solid" : "outline"}
                    onClick={() => setSauce(s)}
                  >
                    {s}
                  </Button>
                ))}
              </Flex>
            </Box>
            <Box>
              <FormControl>
                <FormLabel fontWeight="bold">Cheese</FormLabel>
              </FormControl>
              <Flex gap={4}>
                {Object.values(Cheese).map((c, i) => (
                  <Button
                    key={i}
                    variant={c === cheese ? "solid" : "outline"}
                    onClick={() => setCheese(c)}
                  >
                    {c}
                  </Button>
                ))}
              </Flex>
            </Box>
            <Box>
              <FormControl>
                <FormLabel fontWeight="bold">Vegetables</FormLabel>
              </FormControl>
              <Flex gap={4}>
                {Object.values(Topping.Vegetables).map((v, i) => (
                  <Button
                    key={i}
                    variant={vegetables.includes(v) ? "solid" : "outline"}
                    onClick={() =>
                      setVegetables((prevVeg) =>
                        prevVeg.includes(v)
                          ? prevVeg.filter((veg) => veg !== v)
                          : [...prevVeg, v]
                      )
                    }
                  >
                    {v}
                  </Button>
                ))}
              </Flex>
            </Box>
            <Box>
              <FormControl>
                <FormLabel fontWeight="bold">Meats</FormLabel>
              </FormControl>
              <Flex gap={4}>
                {Object.values(Topping.Meats).map((m, i) => (
                  <Button
                    key={i}
                    variant={meats.includes(m) ? "solid" : "outline"}
                    onClick={() =>
                      setMeats((prevMeats) =>
                        prevMeats.includes(m)
                          ? prevMeats.filter((meat) => meat !== m)
                          : [...prevMeats, m]
                      )
                    }
                  >
                    {m}
                  </Button>
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
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button
              colorScheme="red"
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
