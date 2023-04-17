import { ChakraProvider } from "@chakra-ui/react";
import { fireEvent, render as renderRTL, screen } from "@testing-library/react";
import { ComponentType } from "react";
import { it, vi } from "vitest";
import { AuthProvider } from "../contexts/auth-context";
import { theme } from "../utils/theme";
import LoginForm from "./login-form";

const render = (children: React.ReactElement) => {
  const AllProviders = ({ children }: { children: React.ReactNode }) => {
    return (
      <ChakraProvider theme={theme}>
        <AuthProvider>({children})</AuthProvider>
      </ChakraProvider>
    );
  };

  return renderRTL(children, { wrapper: AllProviders as ComponentType });
};

describe("Login Form", () => {
  beforeEach(() => {
    vi.mock("react-router-dom", () => ({
      useNavigate: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should disable log in button if username or password are empty", () => {
    render(<LoginForm />);

    const usernameInput = screen.getByTestId("input-username");
    const passwordInput = screen.getByTestId("input-password");
    const loginButton = screen.getByTestId("button-login");

    expect(loginButton).toBeDisabled();

    fireEvent.change(usernameInput, { target: { value: "username" } });

    expect(loginButton).toBeDisabled();

    fireEvent.change(passwordInput, { target: { value: "password" } });

    expect(loginButton).toBeEnabled();

    fireEvent.change(usernameInput, { target: { value: "" } });

    expect(loginButton).toBeDisabled();
  });

  it("should show and hide password", () => {
    render(<LoginForm />);

    const passwordInput = screen.getByTestId("input-password");

    expect(passwordInput).toHaveAttribute("type", "password");

    const toggleButton = screen.getByTestId(
      "button-toggle-password-visibility"
    );

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");
  });
});
