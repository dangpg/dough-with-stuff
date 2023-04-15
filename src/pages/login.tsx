import { Box, Center, Flex, Text, VStack } from "@chakra-ui/react";
import { ReactComponent as DWS } from "../assets/dws.svg";
import LoginForm from "../components/login-form";

const Login = () => {
  return (
    <Flex minH="100vh" bg="#EEECEC" justifyContent="center" alignItems="center">
      <VStack gap={5}>
        <Box marginBottom={5}>
          <DWS height={60} />
        </Box>
        <LoginForm />
        <Center>
          <Text fontSize="xs">Copyright © 2023 D-W-S, LP</Text>
        </Center>
      </VStack>
    </Flex>
  );
};

export default Login;
