import express from "express";
import cors from "cors";
import mongoose from "mongoose";

import paymentRoutes from "./routes/paymentRoutes.js";
import authRoutes from "./routes/auth.js";

const app = express();
const PORT = process.env.PORT || 4000;
app.use("/api/auth", authRoutes);

/* ===== MIDDLEWARE ===== */
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ===== MONGODB ===== */
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

/* ===== ROUTES ===== */
app.use("/api/payment", paymentRoutes);   // ✅ ONLY THIS
app.use("/api/auth", authRoutes);

/* ===== HEALTH ===== */
app.get("/health", (req, res) => {
  res.json({ status: "Backend running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



