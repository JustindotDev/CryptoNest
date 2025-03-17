import { useEffect } from "react";
import { useOrderStore } from "../orders/order.jsx";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Text } from "@chakra-ui/react";

const PortfolioChart = () => {
  const { portfolioHistory, fetchPortfolioHistory } = useOrderStore();

  useEffect(() => {
    fetchPortfolioHistory();
  }, [fetchPortfolioHistory]);

  const uniqueHistory = portfolioHistory.reduce((acc, item) => {
    const date = new Date(item.date).toISOString().split("T")[0]; // Keep only the date part
    acc[date] = item; // Store latest entry for each day
    return acc;
  }, {});

  const filteredHistory = Object.values(uniqueHistory); // Convert back to array

  return (
    <Box
      bg={"#10121d"}
      p={4}
      borderRadius={"10px"}
      border={"1px solid gray"}
      textAlign={"center"}
    >
      <Text fontSize={"18px"} fontWeight={"bold"}>
        Portfolio Performance
      </Text>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={portfolioHistory}>
          <XAxis
            dataKey="date"
            tickFormatter={(date) =>
              new Date(date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "2-digit",
              })
            }
            tick={{ fontSize: 12, fill: "white" }} // Adjust font size & color
          />
          <YAxis tick={{ fontSize: 14, fill: "white" }} />
          <Tooltip />
          <Line type="monotone" dataKey="portfolioValue" stroke="#02ff5f" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default PortfolioChart;
