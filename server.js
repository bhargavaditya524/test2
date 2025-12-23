import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import paymentRoutes from "./routes/paymentRoutes.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 ROUTES
app.use("/api/payment", paymentRoutes);
app.use("/api/auth", authRoutes);

// 🔹 TEST ROUTE (VERY IMPORTANT)
app.get("/health", (req, res) => {
  res.json({ status: "Backend running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
