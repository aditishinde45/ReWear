import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import itemRoutes from "./routes/item.js";
import swapRoutes from "./routes/swap.js";
import adminRoutes from "./routes/admin.js";

// Load env vars
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/swaps", swapRoutes);
app.use("/api/admin", adminRoutes);

// DB connect & start server
const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB connection error:", err));
