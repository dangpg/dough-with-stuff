import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ApiError } from "../utils/gen-api-client";
import { PizzaClient } from "../utils/pizza-client";

interface ContextProps {
  accessToken: string | null;
  isAuthenticated: boolean;
  errorCode?: number;
  isPending: boolean;
  login: (username: string, password: string) => void;
}

const AuthContext = createContext<ContextProps | undefined>(undefined);
AuthContext.displayName = "AuthContext";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  // TODO: check session storage
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<number | undefined>();
  const [isPending, setIsPending] = useState(false);

  const login = useCallback(async (username: string, password: string) => {
    try {
      setErrorCode(undefined);
      setIsPending(true);

      const response = await PizzaClient.auth.authLogin({ password, username });

      setAccessToken(response.access_token);
    } catch (err) {
      console.error(`Authentication error: ${err}`);
      setErrorCode((err as ApiError).status);
    } finally {
      setIsPending(false);
    }
  }, []);

  useEffect(() => {
    PizzaClient.request.config.HEADERS = {
      Authorization: `Bearer ${accessToken}`,
    };
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated: accessToken !== null,
        errorCode,
        isPending,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }

  return context;
};

export { AuthProvider, AuthConsumer, useAuth };
