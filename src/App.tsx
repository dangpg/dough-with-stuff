import { AuthConsumer, AuthProvider } from "./contexts/auth-context";
import Login from "./pages/login";

function App() {
  return (
    <AuthProvider>
      <AuthConsumer>
        {(context) => (context?.isAuthenticated ? "Logged in" : <Login />)}
      </AuthConsumer>
    </AuthProvider>
  );
}

export default App;
