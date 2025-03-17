import mongoose from "mongoose";
import axios from "axios";
import Orders from "../models/orders.model.js";
import PortfolioHistory from "../models/portfolioHistory.model.js";

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
              info: tokenData.info || "",
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

  if (!currency || !pairAddress || !entryPrice || !amountInvested) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
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
  const { id } = req.params;

  const orders = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid ID" });
  }

  try {
    const updatedOrder = await Orders.findByIdAndUpdate(id, orders, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedOrder });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const deleteOrders = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid ID" });
  }

  try {
    await Orders.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Order Deleted!" });
  } catch (error) {
    console.log("Error in deleting Orders:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const getTotalInvested = async (req, res) => {
  try {
    const orders = await Orders.find({});
    const totalInvested = orders.reduce(
      (sum, order) => sum + order.amountInvested,
      0
    );

    res.status(200).json({ success: true, totalInvested });
  } catch (error) {
    console.error("Error fetching total invested amount:", error.message);
    res.status(500).json({ success: false, message: "Server Error!" });
  }
};

export const getTotalPortfolio = async (req, res) => {
  try {
    // Fetch all orders
    const orders = await Orders.find();

    if (orders.length === 0) {
      return res.json({
        success: true,
        totalInvested: 0,
        portfolioValue: 0,
        percentageChange: 0,
      });
    }

    let totalInvested = 0;
    let totalPortfolioValue = 0;

    for (let order of orders) {
      const dexResponse = await axios.get(
        `https://api.dexscreener.com/latest/dex/tokens/${order.pairAddress}`
      );
      const tokenData = dexResponse.data?.pairs?.[0];
      console.log(tokenData);
      totalInvested += order.amountInvested;

      // Get the current price from tokenInfo
      const currentPrice = tokenData.priceUsd || 0;
      const entryPrice = order.entryPrice;
      const amountInvested = order.amountInvested;

      // Calculate the number of tokens purchased
      const quantityPurchased = amountInvested / entryPrice;

      // Calculate PnL
      const pnl = (currentPrice - entryPrice) * quantityPurchased;

      // Add to total portfolio value (Fixed!)
      totalPortfolioValue += amountInvested + pnl;
    }

    // Calculate percentage change
    const percentageChange =
      totalInvested > 0
        ? ((totalPortfolioValue - totalInvested) / totalInvested) * 100
        : 0;

    // ✅ Check if an entry exists for today
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to midnight

    const existingEntry = await PortfolioHistory.findOne({ date: today });

    if (existingEntry) {
      // ✅ Update the existing entry instead of creating a new one
      existingEntry.portfolioValue = totalPortfolioValue;
      existingEntry.totalInvested = totalInvested;
      existingEntry.percentageChange = percentageChange.toFixed(2);
      await existingEntry.save();
    } else {
      // ✅ Create a new entry only if there isn't one for today
      await PortfolioHistory.create({
        date: today,
        portfolioValue: totalPortfolioValue,
        totalInvested,
        percentageChange: percentageChange.toFixed(2),
      });
    }

    res.json({
      success: true,
      totalInvested,
      portfolioValue: totalPortfolioValue,
      percentageChange: percentageChange.toFixed(2), // Keep 2 decimal places
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getUnrealizedPnL = async (req, res) => {
  try {
    // Fetch all orders
    const orders = await Orders.find();

    if (orders.length === 0) {
      return res.json({
        success: true,
        unrealizedPnL: 0,
      });
    }

    let totalInvested = 0;
    let unrealizedPnL = 0;

    for (let order of orders) {
      const dexResponse = await axios.get(
        `https://api.dexscreener.com/latest/dex/tokens/${order.pairAddress}`
      );
      const tokenData = dexResponse.data?.pairs?.[0];
      console.log(tokenData);
      totalInvested += order.amountInvested;

      // Get the current price from tokenInfo
      const currentPrice = tokenData.priceUsd || 0;
      const entryPrice = order.entryPrice;
      const amountInvested = order.amountInvested;

      // Calculate the number of tokens purchased
      const quantityPurchased = amountInvested / entryPrice;

      // Calculate PnL
      const pnl = (currentPrice - entryPrice) * quantityPurchased;

      // Add to total portfolio value (Fixed!)
      unrealizedPnL += pnl;
    }
    res.json({
      success: true,
      unrealizedPnL: unrealizedPnL.toFixed(2), // Keep 2 decimal places
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPortfolioHistory = async (req, res) => {
  try {
    const history = await PortfolioHistory.find().sort({ date: 1 }); // Sort by oldest first
    res.json({ success: true, history });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
