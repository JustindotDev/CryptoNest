import { create } from "zustand";
import axios from "axios";

export const useOrderStore = create ((set) => ({
    orders:[],
    fetchOrders: async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders"); // Adjust backend URL if needed
        set({ orders: response.data.data });
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      }
    },
    createOrders: async (order) => {
      try {
        const response = await axios.post("http://localhost:5000/api/orders", order);
        return { success: true, message: "Order created successfully", data: response.data.data };
      } catch (error) {
        console.error("Error creating order:", error.message);
        return { success: false, message: error.response?.data?.message || "Order creation failed" };
      }
    },
}));