import { Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <Flex minH="100vh" justifyContent="center" alignItems="center">
      <VStack>
        <Text>Home</Text>
        <HStack>
          <Link to="/new">
            <Button>New Order</Button>
          </Link>
          <Link to="/list">
            <Button>List Orders</Button>
          </Link>
        </HStack>
      </VStack>
    </Flex>
  );
};

export default Home;
