import dotenv from "dotenv";
dotenv.config();
import { SmartAPI } from "smartapi-javascript";
import cron from "node-cron";
import axios from "axios";
import Order from "./order.model.js";
import { TOTP } from "totp-generator";
const { otp, expires } = TOTP.generate("BWOJCDV7WMF4GWNIYE4G4XUQOA");

const smartApi = new SmartAPI({ api_key: process.env.API_KEY });
let auth = { access_token: null, refresh_token: null };

async function freshLogin() {
    const session = await smartApi.generateSession(
        process.env.CLIENT_CODE,
        process.env.PASSWORD,
        otp.toString()
    );
    console.log(session);
    auth = {
        access_token: session.data.jwtToken,
        refresh_token: session.data.refreshToken,
    };
    console.log("✅ New session @", new Date().toLocaleString());
    return auth;
}

async function refreshJwt() {
    const url =
        "https://apiconnect.angelbroking.in/rest/auth/angelbroking/jwt/v1/generateTokens";

    const res = await axios.post(
        url,
        {
            refreshToken: auth.refresh_token,
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    );

    auth.access_token = res.data.jwtToken;
    auth.refresh_token = res.data.refreshToken;
    console.log("♻️  jwt refreshed");
    return auth;
}

async function placeOrder(price, txn) {
    const tradingsymbol = "SBIN-EQ";
    const symboltoken = "3045";
    // const price = "1000";
    const qty = "1";

    try {
        const out = await smartApi.placeOrder({
            variety: "NORMAL",
            tradingsymbol,
            symboltoken,
            transactiontype: txn,
            exchange: "NSE",
            ordertype: "LIMIT",
            producttype: "INTRADAY",
            duration: "DAY",
            price,
            quantity: qty,
        });

        // Uncomment when DB is ready
        // await Order.create({
        //     orderId: out.data.orderid,
        //     tradingsymbol,
        //     symboltoken,
        //     transactiontype: txn,
        //     price,
        //     quantity: qty,
        //     status: "placed",
        //     raw: out.data,
        // });

        return out;
    } catch (err) {
        if (
            err.message?.includes("AG8001") ||
            err.message?.includes("Invalid Token")
        ) {
            await refreshJwt();
            return placeOrder(txn);
        }

        // Uncomment when DB is ready
        // await Order.create({
        //     tradingsymbol,
        //     symboltoken,
        //     transactiontype: txn,
        //     price,
        //     quantity: qty,
        //     status: "error",
        //     raw: { error: err.message },
        // });

        throw err;
    }
}

(async () => {
    await freshLogin();
})();

cron.schedule("50 4 * * *", async () => {
    try {
        await freshLogin();
    } catch (e) {
        console.error(e);
    }
});

export default placeOrder;
