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
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handlePasswordToggle = () => setIsPasswordVisible((prev) => !prev);

  const navigate = useNavigate();

  const { login, isPending, isAuthenticated, errorCode } = useAuth();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
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
        <form onSubmit={handleSubmit}>
          <VStack gap={5}>
            <FormControl id="username" isRequired isInvalid={errorCode === 401}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                data-testid="input-username"
                value={username}
                variant="flushed"
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired isInvalid={errorCode === 401}>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={isPasswordVisible ? "text" : "password"}
                  data-testid="input-password"
                  value={password}
                  variant="flushed"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement>
                  <Button
                    variant="link"
                    data-testid="button-toggle-password-visibility"
                    onClick={handlePasswordToggle}
                    color="secondary.600"
                    fontWeight="normal"
                  >
                    {isPasswordVisible ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {errorCode !== undefined && (
              <Text color="red.500" fontWeight="bold" fontSize="sm">
                Wrong username or password.
              </Text>
            )}
            <Text fontSize="2xs" color="gray.500" textAlign="center">
              By logging in, I agree to the D-W-S{" "}
              <Link
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                color="secondary.600"
                isExternal
              >
                Terms & Conditions
              </Link>{" "}
              and acknowledge the{" "}
              <Link
                href="https://www.youtube.com/watch?v=y6120QOlsfU"
                color="secondary.600"
                isExternal
              >
                Privacy Policy
              </Link>
              .
            </Text>
            <Button
              width="100%"
              colorScheme="dark"
              isDisabled={isPending}
              rounded="3xl"
              fontWeight="bold"
              type="submit"
            >
              Log in
            </Button>
          </VStack>
        </form>
      </VStack>
    </Box>
  );
};

export default LoginForm;
