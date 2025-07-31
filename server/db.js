import mongoose from "mongoose";

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("🗄️  Mongo connected"))
    .catch((err) => console.error("Mongo connection error:", err));

module.exports = mongoose;
