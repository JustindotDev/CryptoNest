import mongoose from 'mongoose';
import axios from "axios";
import Orders from '../models/orders.model.js';

export const getOrders = async (req, res) => {
    try {
        // 1. Fetch all orders from MongoDB
        const orders = await Orders.find({});
    
        // 2. Fetch Dexscreener data for each order
        const updatedOrders = await Promise.all(
          orders.map(async (order) => {
            try {
              const dexResponse = await axios.get(
                `https://api.dexscreener.com/latest/dex/tokens/${order.pairAddress}`
              );

    
              const tokenData = dexResponse.data?.pairs?.[0]; // Get first token pair
    
              if (!tokenData) {
                console.warn(`No data found for ${order.pairAddress}`);
                return order; // Return order without changes if no data found
              }
    
              return {
                ...order.toObject(),
                tokenInfo: {
                  baseToken: tokenData.baseToken,
                  quoteToken: tokenData.quoteToken,
                  priceUsd: tokenData.priceUsd,
                  volume24h: tokenData.volume.h24,
                  info: tokenData.info|| "", 
                },
              };
            } catch (error) {
              console.error(`Error fetching Dexscreener data: ${error.message}`);
              return order; // Return order without changes on error
            }
          })
        );
    
        res.status(200).json({ success: true, data: updatedOrders });
      } catch (error) {
        console.error("Error in fetching Orders:", error.message);
        res.status(500).json({ success: false, message: "Server Error!" });
      }
};

export const createOrders = async (req, res) => {
    const { currency, pairAddress, entryPrice, amountInvested } = req.body;

    if(!currency || !pairAddress || !entryPrice || !amountInvested){
        return res.status(400).json({ success:false, message: "Please provide all fields"});
    }

    try {
        const newOrder = new Orders({
          currency,
          pairAddress,
          entryPrice,
          amountInvested,
          tokenInfo: {}, // Empty at first
        });
    
        await newOrder.save();
        res.status(201).json({ success: true, data: newOrder });
      } catch (error) {
        console.error("Error in Creating Order:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
      }
};

export const updateOrders = async (req, res) => {
    const {id} = req.params;

    const orders = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid ID"});
    }

    try {
        const updatedOrder = await Orders.findByIdAndUpdate(id, orders, {new: true});
        res.status(200).json({ success: true, data: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error"});
    }
};

export const deleteOrders = async (req, res) => {
    const {id} = req.params;
    
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid ID"});
    }
    
    try {
        await Orders.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Order Deleted!"});
    } catch (error) {
        console.log("Error in deleting Orders:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};