import { Button, Container, Flex, HStack, Text } from "@chakra-ui/react"
import { Link } from "react-router-dom";


const Navbar = () => {
  return <Container maxW={"1400px"} px={4}>
    <Flex
        h={"75px"}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
            base:"column",
            sm:"row"
        }}
    >
        <Text
            fontSize={{ base:"12", sm:"24"}}
            fontWeight={"600"}
            fontFamily={"Montserrat, sans-serif"}
            letterSpacing={"tighter"}
            fontStyle={"italic"}
            paddingTop={"30px"}
        >
            <Link to={"/"}>CryptoNest</Link>
        </Text>

        <HStack 
            spacing={6} 
            alignItems={"center"}
            alignSelf={"flex-end"}
            marginRight={40}
            fontFamily={'Nunito, sans-serif'}
            >
            <Link to={"/home"}>
                <Button
                    variant={"ghost"}
                    color={'white'}
                    _hover={{ color: "rgb(122, 95, 243)" }}
                    _active={{ color: "rgb(122, 95, 243)" }}
                >Overview</Button>
            </Link>
            <Link to={"/asset"}>
                <Button
                    variant={"ghost"}
                    color={'white'}
                    _hover={{ color: "rgb(122, 95, 243)" }}
                    _active={{ color: "rgb(122, 95, 243)" }}
                >Asset</Button>
            </Link>
        </HStack>
    </Flex>
  </Container>
};

export default Navbar;