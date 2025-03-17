import mongoose from "mongoose";

const PortfolioHistorySchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  portfolioValue: Number,
});

const PortfolioHistory = mongoose.model(
  "PortfolioHistory",
  PortfolioHistorySchema
);

export default PortfolioHistory;
