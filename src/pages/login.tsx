import { Center, Flex, Text, VStack } from "@chakra-ui/react";
import React from "react";
import LoginForm from "../components/login-form";

const Login = () => {
  return (
    <Flex minH="100vh" bg="#EEECEC" justifyContent="center" alignItems="center">
      <VStack gap={5}>
        <LoginForm />
        <Center>
          <Text fontSize="xs">Copyright © 2023 D-W-S, LP</Text>
        </Center>
      </VStack>
    </Flex>
  );
};

export default Login;
