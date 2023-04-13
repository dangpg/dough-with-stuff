import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protected-route";
import { AuthProvider } from "./contexts/auth-context";
import Home from "./pages/home";
import List from "./pages/list";
import Login from "./pages/login";
import New from "./pages/new";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="login" element={<Login />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="new"
            element={
              <ProtectedRoute>
                <New />
              </ProtectedRoute>
            }
          />
          <Route
            path="list"
            element={
              <ProtectedRoute>
                <List />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>

      {/* <Order tableNo={1} /> */}
    </AuthProvider>
  );
}

export default App;
