import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    orderId: String,
    tradingsymbol: String,
    symboltoken: String,
    transactiontype: { type: String, enum: ["BUY", "SELL"] },
    price: Number,
    quantity: Number,
    status: String, // placed | error
    raw: Object, // entire API response
    createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
