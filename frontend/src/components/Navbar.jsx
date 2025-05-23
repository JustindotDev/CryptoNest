import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader.jsx";
import { LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

const Navbar = () => {
  const navigate = useNavigate();
  const { isLoggingOut, logout } = useAuthStore();

  const handleLogout = () => {
    logout(navigate);
  };

  return (
    <Container maxW={"1400px"} px={4}>
      {isLoggingOut && <Loader />}
      <Flex
        h={"75px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        {/* Logo */}
        <Text
          fontSize={{ base: "12", sm: "24" }}
          fontWeight={"600"}
          fontFamily={"Montserrat, sans-serif"}
          letterSpacing={"tighter"}
          fontStyle={"italic"}
          paddingTop={"30px"}
        >
          <Link
            to={"/home"}
            style={{
              marginLeft: "50px",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Text>Cryp</Text>{" "}
            <Text
              textColor={"rgb(211, 164, 8)"}
              fontSize={"40px"}
              fontWeight={"extrabold"}
            >
              N
            </Text>
          </Link>
        </Text>

        {/* Navbar Links + Logout Button */}
        <HStack
          spacing={6}
          alignItems={"center"}
          alignSelf={"flex-end"}
          marginRight={40}
          fontFamily={"Nunito, sans-serif"}
        >
          <Link to={"/home"}>
            <Button
              variant={"ghost"}
              color={"white"}
              _hover={{ color: "rgb(122, 95, 243)" }}
              _active={{ color: "rgb(122, 95, 243)" }}
            >
              Overview
            </Button>
          </Link>
          <Link to={"/asset"}>
            <Button
              variant={"ghost"}
              color={"white"}
              _hover={{ color: "rgb(122, 95, 243)" }}
              _active={{ color: "rgb(122, 95, 243)" }}
            >
              Asset
            </Button>
          </Link>

          {/* 🔹 Logout Button */}
          <Button
            onClick={handleLogout}
            variant={"ghost"}
            color="white"
            fontWeight="bold"
            _hover={{
              color: "rgb(243, 59, 59)",
              transform: "scale(1.05)",
            }}
            _active={{
              color: "rgb(243, 59, 59)",
              transform: "scale(0.95)",
            }}
            display="flex"
            alignItems="center"
            gap={2}
            transition="all 0.2s ease-in-out"
          >
            {isLoggingOut ? (
              <Spinner size="sm" color="white" />
            ) : (
              <LogOut size={18} />
            )}
            Logout
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
