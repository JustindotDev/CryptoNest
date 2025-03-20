import {
  Box,
  Container,
  Divider,
  Flex,
  HStack,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useOrderStore } from "../orders/order.jsx";
import { useEffect } from "react";

const History = () => {
  const { historyOrders, fetchOrders } = useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  return (
    <Container
      bg={"#10121d"}
      fontFamily={"Nunito, sans-serif"}
      maxW={"35%"}
      borderRadius={"20px"}
      border={"1px solid  rgb(80, 80, 80)"}
      shadow={"2px 2px 10px rgb(49, 49, 49)"}
    >
      <Flex flexDirection={"column"}>
        <Box minW={"100%"} maxW={"100%"} marginTop={"10px"}>
          <Text fontWeight={"bold"} marginLeft={"20px"}>
            History
          </Text>
          <HStack marginTop={"5px"}>
            <Text
              marginRight={"80px"}
              marginLeft={"20px"}
              fontWeight={"bold"}
              fontSize={"14px"}
            >
              Token
            </Text>
            <Text marginRight={"60px"} fontWeight={"bold"} fontSize={"14px"}>
              Invested
            </Text>
            <Text marginRight={"50px"} fontWeight={"bold"} fontSize={"14px"}>
              Sold
            </Text>
            <Text fontWeight={"bold"} fontSize={"14px"}>
              PnL
            </Text>
          </HStack>
          <Divider borderColor="gray.700" marginTop={"10px"} />
        </Box>
        <Box minW={"100%"} minH={"20rem"} maxH={"20rem"}>
          <SimpleGrid>
            {historyOrders.map((order, index) => (
              <Box>
                <HStack key={index} paddingY={6}>
                  {/* Token Image */}
                  <Box w="12%" display="flex" alignItems="center" gap="8px">
                    {order.tokenInfo?.info?.imageUrl ? (
                      <img
                        src={order.tokenInfo.info.imageUrl}
                        alt={order.tokenInfo.info.imageUrl}
                        width="30"
                        height="30"
                        style={{ borderRadius: "50%" }}
                      />
                    ) : (
                      <Text>N/A</Text> // Show "N/A" if image is missing
                    )}

                    <Text fontSize={"14px"}>
                      {order.tokenInfo?.baseToken?.symbol || "Unknown Token"}
                    </Text>
                  </Box>
                  {/* Amount Invested */}
                  <Text w={"15%"} marginLeft={"90px"} fontSize={"14px"}>
                    ${parseFloat(order.amountInvested)}
                  </Text>
                  {/* Placeholder for Sold */}
                  <Text w={"15%"} marginLeft={"40px"} fontSize={"14px"}>
                    ${order.gains ? order.gains.toFixed(2) : "0"}
                  </Text>
                  {/* PnL section */}
                  <Text w={"15%"} marginLeft={"20px"} fontSize={"14px"}>
                    ${order.totalPnl ? order.totalPnl : "0"}
                  </Text>
                </HStack>
                <Divider borderColor="gray.700" />
              </Box>
            ))}
          </SimpleGrid>
        </Box>
      </Flex>
    </Container>
  );
};

export default History;
