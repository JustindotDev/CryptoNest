import { Container, Flex, Box, Heading, Image } from "@chakra-ui/react";
import { useState } from "react";
import AuthForm from "../components/AuthForm.jsx";

const Accounts = () => {
  const [action, setAction] = useState("Log in");

  return (
    <Container maxW={"1400px"} px={"20px"} pt={"20px"}>
      <Flex
        bg={"rgba(17, 24, 39, 1)"}
        gap={"20px"}
        borderRadius={"20px"}
        border={"1px solid  rgb(80, 80, 80)"}
        shadow={"2px 2px 10px rgb(49, 49, 49)"}
      >
        <Flex width={"50%"} height={"560px"} justifyContent={"center"}>
          <Box paddingTop={"90px"}>
            <Box display={"flex"}>
              <Image src="./src/assets/logo.png" height={"120px"} />
              <Heading pt={"35px"} size={"2xl"} fontFamily={"Montserrat, sans-serif"}>
                Crypto Nest
              </Heading>
            </Box>
            <Image src="./src/assets/bglogo.png" height={"200px"} pl={"150px"} />
          </Box>
        </Flex>
        <Flex width={"50%"} height={"560px"} justifyContent={"center"}>
          <Box>
            <AuthForm action={action} setAction={setAction} />
          </Box>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Accounts;
