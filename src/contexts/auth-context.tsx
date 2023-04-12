import { createContext, useCallback, useContext, useState } from "react";
import { PizzaClient } from "../utils/pizza-client";

interface ContextProps {
  accessToken: string | null;
  isAuthenticated: boolean;
  hasError: boolean;
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
  const [hasError, setHasError] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const login = useCallback(async (username: string, password: string) => {
    try {
      setHasError(false);
      setIsPending(true);

      const response = await PizzaClient.auth.authLogin({ password, username });

      setAccessToken(response.access_token);
    } catch (err) {
      console.error(`Authentication error: ${err}`);
      setHasError(true);
    } finally {
      setIsPending(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        isAuthenticated: accessToken !== null,
        hasError,
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
