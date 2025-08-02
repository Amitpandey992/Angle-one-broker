import dotenv from "dotenv";
dotenv.config();
import express from "express";
import placeOrder from "./smartapi.js";
import cors from "cors";
import ngrok from "ngrok";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use(
    cors({
        origin: function (origin, callback) {
            if (
                !origin ||
                origin.includes("localhost") ||
                origin.includes("ngrok-free.app") ||
                (process.env.NETLIFY_DEPLOY_URL &&
                    origin.includes(process.env.NETLIFY_DEPLOY_URL))
            ) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowedHeaders: [
            "Content-Type",
            "Authorization",
            "ngrok-skip-browser-warning",
        ],
    })
);

app.use((req, res, next) => {
    console.log("🔍 Request received:", req.method, req.url);
    console.log("🔑 Origin:", req.headers.origin);
    next();
});

let publicUrl = "";

app.get("/ngrok-url", (req, res) => {
    const fallback = process.env.EXTERNAL_URL || `https://${req.headers.host}`;
    res.json({ url: publicUrl || fallback });
});

app.post("/buy", async (req, res) => {
    try {
        const { price } = req.body;
        const order = await placeOrder(price, "BUY");
        res.status(200).json({ success: true, order_id: order.data.orderid });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post("/sell", async (req, res) => {
    try {
        const { price } = req.body;
        const order = await placeOrder(price, "SELL");
        res.status(200).json({ success: true, order_id: order.data.orderid });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post("/webhook", async (req, res) => {
    const signal = req.body;
    const { price } = req.body;

    console.log("📈 Received signal from TradingView:", signal);

    const { action } = signal;

    if (!action || (action !== "BUY" && action !== "SELL")) {
        return res.status(400).json({
            success: false,
            message: "Invalid action in signal. Must be BUY or SELL.",
        });
    }

    try {
        const order = await placeOrder(price, action);
        console.log("✅ Order placed successfully:", order.data.orderid);

        res.status(200).json({
            success: true,
            message: "Order placed",
            order_id: order.data.orderid,
        });
    } catch (err) {
        console.error("❌ Failed to place order:", err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

const isLocal = process.env.NODE_ENV !== "production";

app.listen(PORT, async () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);

    if (isLocal) {
        try {
            const url = await ngrok.connect({
                addr: PORT,
                authtoken: process.env.NGROK_AUTH_TOKEN,
            });
            publicUrl = url;
            console.log("🌐 Ngrok tunnel started:", publicUrl);
            console.log(
                `📩 Use this URL in TradingView or Webhooks: ${publicUrl}/webhook`
            );
        } catch (e) {
            console.warn("⚠️ ngrok failed to start:", e.message);
        }
    } else {
        publicUrl = process.env.EXTERNAL_URL || "";
        console.log("🌍 Production public URL:", publicUrl);
    }
});
