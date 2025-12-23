import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js";

const app = express();
const port = process.env.PORT || 3001;

// 🔥 MIDDLEWARE FIRST
app.use(cors());
app.use(express.json());              // ⭐ REQUIRED
app.use(express.urlencoded({ extended: true }));

// 🔥 ROUTES AFTER MIDDLEWARE
app.use("/api/auth", authRoutes);

// test route
app.get("/", (req, res) => {
  res.json({ status: "Backend running" });
});

mongoose
  .connect("YOUR_MONGODB_URI")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
