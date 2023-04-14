import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
  InputGroup,
  InputRightElement,
  Text,
  Link,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handlePasswordToggle = () => setIsPasswordVisible((prev) => !prev);

  const navigate = useNavigate();

  const { login, isPending, isAuthenticated } = useAuth();

  const handleLogin = () => {
    login(username, password);
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    navigate("/");
  }, [isAuthenticated, navigate]);

  return (
    <Box minW="sm" maxW="sm" bg="white" padding={7} rounded="3xl">
      <VStack gap={5}>
        <Heading fontSize="2xl" fontWeight="bold">
          Log in
        </Heading>
        <FormControl id="username" isRequired>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            value={username}
            variant="flushed"
            onChange={(e) => setUsername(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <Input
              type={isPasswordVisible ? "text" : "password"}
              value={password}
              variant="flushed"
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputRightElement>
              <Button
                variant="link"
                onClick={handlePasswordToggle}
                color="secondary.600"
                fontWeight="normal"
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Text fontSize="2xs" color="gray.500" textAlign="center">
          By logging in, I agree to the D-W-S{" "}
          <Link
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            color="secondary.600"
          >
            Terms & Conditions
          </Link>{" "}
          and acknowledge the{" "}
          <Link
            href="https://www.youtube.com/watch?v=y6120QOlsfU"
            color="secondary.600"
          >
            Privacy Policy
          </Link>
          .
        </Text>
        <Button
          width="100%"
          colorScheme="dark"
          onClick={handleLogin}
          isDisabled={isPending}
          rounded="3xl"
          fontWeight="bold"
        >
          Log in
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginForm;
