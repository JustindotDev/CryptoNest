import express from "express";
import {
  createOrders,
  deleteOrders,
  getOrders,
  updateOrders,
  getTotalInvested,
  getTotalPortfolio,
  getUnrealizedPnL,
  getPortfolioHistory,
} from "../controllers/orders.controller.js";

const router = express.Router();

router.get("/", getOrders);
router.post("/", createOrders);
router.put("/:id", updateOrders);
router.delete("/:id", deleteOrders);
router.get("/total-invested", getTotalInvested);
router.get("/total-portfolio", getTotalPortfolio);
router.get("/unrealizedpnl", getUnrealizedPnL);
router.get("/portfolio-history", getPortfolioHistory);

export default router;
