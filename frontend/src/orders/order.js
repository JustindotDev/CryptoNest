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


    // setOrders: (orders) => set({ orders }),
    // createOrders: async (newOrder) => {
    //     if (!newOrder.currency || !newOrder.pairAddress || !newOrder.amountInvested || !newOrder.entryPrice) {
    //       return { success: false, message: "Please fill in all fields." };
    //     }
      
    //     try {
    //       const res = await fetch("http://localhost:5000/api/orders", {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(newOrder),
    //       });
      
    //       if (!res.ok) {
    //         return { success: false, message: "Failed to submit order" };
    //       }
      
    //       // Check if response has a body before parsing
    //       let data;
    //       if (res.headers.get("content-length") === "0" || res.status === 204) {
    //         data = { data: null };  // No content, return default object
    //       } else {
    //         data = await res.json();
    //       }
      
    //       set((state) => ({ orders: [...state.orders, data.data] }));
      
    //       return { success: true, message: "Order submitted successfully." };
    //     } catch (error) {
    //       console.error("Error creating order:", error);
    //       return { success: false, message: "Something went wrong." };
    //     }
    //   },
    // fetchOrders: async () => {
    //   const res = await fetch("http://localhost:5000/api/orders");
    //   const data = await res.json();
    //   set({ orders: data.data });
    // }
       
}));