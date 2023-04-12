import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AuthConsumer, AuthProvider } from "./contexts/auth-context";
import Home from "./pages/home";
import Login from "./pages/login";
import Order from "./pages/order";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="new" element={<Order tableNo={1} />} />
        </Routes>
      </Router>
      {/* <AuthConsumer>
        {(context) => (context?.isAuthenticated ? "Logged in" : <Login />)}
      </AuthConsumer> */}

      {/* <Order tableNo={1} /> */}
    </AuthProvider>
  );
}

export default App;
