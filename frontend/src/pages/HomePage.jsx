import { useEffect } from "react";
import { useOrderStore } from "../orders/order.jsx";
import { Box, Container, Text } from "@chakra-ui/react";
import PortfolioChart from "../components/PortfolioChart.jsx";

const HomePage = () => {
  const {
    totalInvested,
    fetchTotalInvested,
    portfolioValue,
    percentageChange,
    fetchPortfolioData,
    unrealizedPnL,
    fetchUnrealizedPnL,
    portfolioHistory,
    fetchPortfolioHistory,
  } = useOrderStore();

  useEffect(() => {
    fetchTotalInvested();
    fetchPortfolioData();
    fetchUnrealizedPnL();
    fetchPortfolioHistory();
  }, [
    fetchTotalInvested,
    fetchPortfolioData,
    fetchUnrealizedPnL,
    fetchPortfolioHistory,
  ]);

  return (
    <Container maxW={"1400px"} display={"flex"}>
      <Box display={"block"} mx={"100px"} my={"80px"}>
        <Box
          bg={"#10121d"}
          p={4}
          borderRadius={"10px"}
          border={"1px solid gray"}
          textAlign={"center"}
        >
          <Text fontSize={"18px"} fontWeight={"bold"}>
            Total Amount Invested
          </Text>
          <Text
            fontSize={"24px"}
            fontWeight={"bold"}
            color={"white"}
            letterSpacing={"tight"}
          >
            ${totalInvested.toFixed(2)}
          </Text>
        </Box>

        {/* ✅ Added Portfolio Value Display */}
        <Box
          bg={"#10121d"}
          p={4}
          borderRadius={"10px"}
          border={"1px solid gray"}
          textAlign={"center"}
          my={7}
        >
          <Text fontSize={"18px"} fontWeight={"bold"}>
            Total Portfolio Value
          </Text>
          <Box display={"flex"} justifyContent={"space-between"} mx={"13px"}>
            <Text fontSize={"28px"} fontWeight={"bold"} color={"white"}>
              ${portfolioValue.toFixed(2)}
            </Text>
            <Text
              width={"45px"}
              p={"2px"}
              alignSelf={"center"}
              bg={"gray.700"}
              borderRadius={"4px"}
              fontSize={"12px"}
              color={percentageChange >= 0 ? "rgb(2, 255, 95)" : "red.300"} // Green if positive, Red if negative
            >
              {percentageChange}%
            </Text>
          </Box>
        </Box>

        {/* Unrealized Gain */}
        <Box
          bg={"#10121d"}
          p={4}
          borderRadius={"10px"}
          border={"1px solid gray"}
          textAlign={"center"}
          my={2}
        >
          <Text fontSize={"18px"} fontWeight={"bold"}>
            Unrealized PnL
          </Text>
          <Text
            fontSize={"24px"}
            fontWeight={"bold"}
            color={unrealizedPnL >= 0 ? "rgb(0, 255, 94)" : "red.300"} // Green if positive, Red if negative
          >
            ${unrealizedPnL}
          </Text>
        </Box>
      </Box>
      <Box mt={"50px"} width={"800px"}>
        <PortfolioChart />
      </Box>
    </Container>
  );
};

export default HomePage;
