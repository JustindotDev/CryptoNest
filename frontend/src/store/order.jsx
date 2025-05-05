import { create } from "zustand";
import axios from "axios";

export const useOrderStore = create((set) => ({
  orders: [],
  historyOrders: [],
  portfolioHistory: [],
  remainingBalance: {},
  totalInvested: 0,
  portfolioValue: 0,
  percentageChange: 0,
  unrealizedPnL: 0,
  fetchOrders: async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/orders");
      if (response.data.success) {
        const ordersArray = response.data.data; // Corrected to access "data"

        set({
          orders: ordersArray.filter((order) => order.status !== "closed"), // Active orders
          historyOrders: ordersArray.filter(
            (order) => order.status === "closed"
          ), // Closed orders
        });
      }
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
  },
  createOrders: async (order) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        order
      );
      return {
        success: true,
        message: "Order created successfully",
        data: response.data.data,
      };
    } catch (error) {
      console.error("Error creating order:", error.message);
      return {
        success: false,
        message: error.response?.data?.message || "Order creation failed",
      };
    }
  },

  fetchTotalInvested: async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/orders/total-invested"
      );
      set({ totalInvested: response.data.totalInvested });
    } catch (error) {
      console.error("Error fetching total invested amount:", error.message);
    }
  },

  fetchPortfolioData: async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/orders/total-portfolio"
      );
      set({
        portfolioValue: response.data.portfolioValue,
        percentageChange: response.data.percentageChange,
      });
    } catch (error) {
      console.error("Error fetching portfolio data:", error.message);
    }
  },

  fetchUnrealizedPnL: async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/orders/unrealizedpnl"
      );
      set({
        unrealizedPnL: response.data.unrealizedPnL,
      });
    } catch (error) {
      console.error("Error fetching unrealizedpnl:", error.message);
    }
  },

  fetchPortfolioHistory: async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/orders/portfolio-history"
      );
      set({ portfolioHistory: response.data.history });
    } catch (error) {
      console.error("Error fetching portfolio history:", error.message);
    }
  },

  fetchRemainingBalance: async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/orders/remaining-balance"
      );
      set({
        remainingBalance: response.data.remainingBalances,
      });
    } catch (error) {
      console.error("Error fetching unrealizedpnl:", error.message);
    }
  },
}));
