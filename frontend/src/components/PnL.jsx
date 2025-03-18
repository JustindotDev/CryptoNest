import { useState, useEffect } from "react";
import axios from "axios";
import { Text } from "@chakra-ui/react"; // Assuming you use Chakra UI

const RealTimePnL = ({ order }) => {
  const [currentPrice, setCurrentPrice] = useState(null);
  const [pnl, setPnL] = useState(0);

  // Fetch the latest token price
  const fetchLatestPrice = async () => {
    try {
      const response = await axios.get(
        `https://api.dexscreener.com/latest/dex/tokens/${order.pairAddress}`
      );
      const latestPrice = response.data?.pairs?.[0]?.priceUsd || 0;

      setCurrentPrice(latestPrice);

      // Calculate PnL: (Current Price - Entry Price) * Tokens Bought
      const tokensBought =
        order.entryPrice > 0 ? order.amountInvested / order.entryPrice : 0;
      const updatedPnL = (latestPrice - order.entryPrice) * tokensBought;

      setPnL(updatedPnL);
    } catch (error) {
      console.error("Error fetching price:", error);
    }
  };

  // Fetch price every 5 seconds
  useEffect(() => {
    fetchLatestPrice(); // Initial fetch
    const interval = setInterval(fetchLatestPrice, 5000);
    return () => clearInterval(interval); // Cleanup on unmount
  }, [order.pairAddress]); // Update if order pair changes

  return (
    <Text
      w="14%"
      marginLeft={"50px"}
      color={pnl > 0 ? "green" : pnl < 0 ? "red" : "gray"}
      fontWeight="bold"
    >
      {pnl === 0
        ? "$0"
        : pnl > 0
        ? `+$${Number.isInteger(pnl) ? pnl.toFixed(0) : pnl.toFixed(2)}`
        : `-$${
            Number.isInteger(pnl)
              ? Math.abs(pnl).toFixed(0)
              : Math.abs(pnl).toFixed(2)
          }`}
    </Text>
  );
};

export default RealTimePnL;
