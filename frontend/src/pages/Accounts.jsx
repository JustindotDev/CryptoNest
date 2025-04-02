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
          <Box
            width={"full"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"end"}
          >
            <Image
              src="./src/assets/bg.png"
              width={"full"}
              height={"full"}
              borderTopLeftRadius={"20px"}
              borderBottomLeftRadius={"20px"}
            />
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
