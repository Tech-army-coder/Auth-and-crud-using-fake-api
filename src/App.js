import { Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css'; // import Bootstrap CSS
import { useState, useEffect } from "react";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Home from "./pages/Home";
import Login from "./components/auth/LoginForm";
import Contact from "./pages/Contact/Contact";
import Features from "./pages/Feature/Features";
import About from "./pages/About/About";
import Signup from "./components/auth/SignupForm";
import ForgotPasswordForm from "./components/auth/ForgotpasswordForm";
import ResetPasswordForm from "./components/auth/ResetpasswordForm";
import Dashboard from "./pages/Dashboard/DashboardPage";
import Employees from "./components/employees/Employees";
import EmployeeDetails from "./components/employees/EmployeeDetails";
import UpdateEmployee from "./components/employees/UpdateEmployee";

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token) => {
    setToken(token);
    setIsLoggedIn(true);
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setToken(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return { token, isLoggedIn, login, logout };
};

const ProtectedRoute = ({ children, isLoggedIn }) => {
  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

function App() {
  const { login, logout, isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/login"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login login={login} />
          }
        />

        <Route
          path="/signup"
          element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Signup />}
        />

        <Route
          path="/forgot-password"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <ForgotPasswordForm />
          }
        />

        <Route
          path="/reset-password"
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <ResetPasswordForm />
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard logout={logout} />
            </ProtectedRoute>
          }
        />

          <Route
          path="/my-profile"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Dashboard logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employees-data"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <Employees logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <EmployeeDetails logout={logout} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/employee/edit/:id"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <UpdateEmployee logout={logout} />
            </ProtectedRoute>
          }
        />
      </Routes>

      <Footer isLoggedIn={isLoggedIn} logout={logout} />
    </BrowserRouter>
  );
}

export default App;
