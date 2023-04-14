import { ChevronRightIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Flex minH="100vh" alignItems="stretch" direction="column">
      <Flex bg="primary.500" h="60px" padding={2} alignItems="center">
        D-W-S
      </Flex>
      <Flex bg="primary.600" h="30px" padding={2} alignItems="center"></Flex>
      <VStack alignItems="stretch" marginY={5} marginX={20} gap={5}>
        <Heading>Home</Heading>
        <Link to="/new">
          <Box
            rounded="lg"
            borderColor="gray.400"
            borderWidth={1}
            borderStyle="solid"
            padding={5}
          >
            <HStack justifyContent="space-between">
              <VStack alignItems="flex-start">
                <Heading fontSize="xl">New Order</Heading>
                <Text>Create a new order(s) for a table.</Text>
              </VStack>
              <ChevronRightIcon boxSize={8} />
            </HStack>
          </Box>
        </Link>
        <Link to="/list">
          <Box
            rounded="lg"
            borderColor="gray.400"
            borderWidth={1}
            borderStyle="solid"
            padding={5}
          >
            <HStack justifyContent="space-between">
              <VStack alignItems="flex-start">
                <Heading fontSize="xl">List Orders</Heading>
                <Text>Keep track of your current orders.</Text>
              </VStack>
              <ChevronRightIcon boxSize={8} />
            </HStack>
          </Box>
        </Link>
      </VStack>
    </Flex>
  );
};

export default Home;
