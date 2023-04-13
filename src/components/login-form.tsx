import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
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
    <Box maxW="md" mx="auto" mt={4} p={4} borderWidth={1} rounded="lg">
      <FormControl id="username" isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>
      <Stack mt={4} direction="row" spacing={4} justify="flex-end">
        <Button colorScheme="teal" onClick={handleLogin} isDisabled={isPending}>
          Login
        </Button>
      </Stack>
    </Box>
  );
};

export default LoginForm;
