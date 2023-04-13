import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthConsumer, AuthProvider } from "./contexts/auth-context";
import Home from "./pages/home";
import List from "./pages/list";
import Login from "./pages/login";
import New from "./pages/new";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="new" element={<New />} />
          <Route path="list" element={<List />} />
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
