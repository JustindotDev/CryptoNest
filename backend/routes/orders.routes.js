import express from "express";
import { createOrders, deleteOrders, getOrders, updateOrders } from "../controllers/orders.controller.js";

const router = express.Router();

router.get("/", getOrders);
router.post("/", createOrders);
router.put("/:id", updateOrders);
router.delete("/:id", deleteOrders);

export default router;