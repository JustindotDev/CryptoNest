import { Box, Divider } from "@chakra-ui/react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Homepage from "./pages/HomePage.jsx";
import Accounts from "./pages/Accounts";
import Assets from "./pages/Assets";
import theme from "./components/Theme";

// Authentication function
const isAuthenticated = () => !!localStorage.getItem("token");

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

function App() {
  const location = useLocation(); // Get current route
  const showNavbar = isAuthenticated() && location.pathname !== "/"; // Hide navbar on login page
  return (
    <>
      {/* Crypto Nest */}
      <Box
        minH={"100vh"}
        theme={theme}
        sx={{
          background:
            "radial-gradient(200% 180% at bottom, rgb(12, 9, 70),rgb(1, 3, 20) 30%)",
        }}
        color={"white"}
      >
        {/* Show Navbar only when authenticated and not on the login page */}
        {showNavbar && <Navbar />}
        {showNavbar && (
          <Divider orientation="horizontal" borderColor="gray.700" />
        )}

        <Routes>
          {/* Default landing page is Login */}
          <Route path="/Signin" element={<Accounts />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/asset"
            element={
              <ProtectedRoute>
                <Assets />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Box>
    </>
  );
}

export default App;
