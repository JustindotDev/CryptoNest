import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    currency: {
      type: String,
      required: true,
    },
    pairAddress: {
      type: String,
      required: true,
    },
    entryPrice: {
      type: Number,
      required: true,
    },
    amountInvested: {
      type: Number,
      required: true,
    },
    sellPrice: {
      type: Number,
      required: true,
    },
    gains: {
      type: Number,
      required: true,
    },
    tokenInfo: {
      baseToken: {
        symbol: String,
        name: String,
        address: String,
        image: String,
      },
      quoteToken: {
        symbol: String,
        name: String,
        address: String,
      },
      priceUsd: Number,
      volume24h: Number,

      info: {
        imageUrl: String,
      },
    },
  },
  {
    timestamps: true, //createdAt, UpdatedAt
  }
);

const Orders = mongoose.model("Orders", orderSchema);

export default Orders;
