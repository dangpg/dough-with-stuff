import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { PizzaDto } from "../types/pizza-dto";
import { formatTimestamp } from "../utils";
import { usePizzaAPI } from "../hooks/usePizzaAPI";
import { useEffect } from "react";
import LoadingOverlay from "./loading-overlay";

interface Props {
  pizza: PizzaDto;
  onOrderDeleted: () => void;
}

const ListItem = ({ pizza, onOrderDeleted }: Props) => {
  const { Order_ID, Timestamp, Table_No, Size, Crust, Flavor } = pizza;

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { isDone, hasError, deletePizza, isPending } = usePizzaAPI();

  const handleDeleteClick = async () => {
    if (Order_ID === undefined) return;

    deletePizza(Order_ID);
  };

  useEffect(() => {
    if (!isDone || !Order_ID) return;

    if (hasError) {
      toast({
        title: "Unexpected error.",
        description: `An error occurred while deleting the order #${Order_ID}. Please try again.`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      return;
    }

    toast({
      title: "Order deleted.",
      description: `Successfully deleted order #${Order_ID}.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });

    onOrderDeleted();
  }, [isDone, hasError, toast, onOrderDeleted, Order_ID]);

  return (
    <>
      {isPending && <LoadingOverlay>Deleting Order</LoadingOverlay>}
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
                  onClick={onOpen}
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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Order</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{`Are you sure you want to delete order #${Order_ID}?`}</Text>
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

export default ListItem;
