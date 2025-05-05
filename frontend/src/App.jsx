import { Box, Divider, Spinner } from "@chakra-ui/react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import AssetPage from "./pages/AssetPage.jsx";
import { useAuthStore } from "./store/useAuthStore.js";
import { useEffect } from "react";
import HomePage from "./pages/HomePage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

function App() {
  const location = useLocation();
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();

  const publicRoutes = ["/login", "/signup"];
  const isPublicRoute = publicRoutes.includes(location.pathname);

  useEffect(() => {
    if (!isPublicRoute) {
      checkAuth();
    } else {
      useAuthStore.setState({ isCheckingAuth: false });
    }
  }, [checkAuth, isPublicRoute]);

  if (isCheckingAuth && !authUser) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  }
  return (
    <div>
      {authUser && <Navbar />}
      <Routes>
        <Route
          path="/signup"
          element={!authUser ? <SignupPage /> : <Navigate to="/" />}
        />

        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />

        <Route
          path="/"
          element={authUser ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/asset"
          element={authUser ? <AssetPage /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
