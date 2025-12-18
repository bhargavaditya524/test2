

import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/paymentRoutes.js";

const app = express();

// 🔹 Enable CORS globally, must be BEFORE routes
app.use(cors({
  origin: ["https://kaleidoscopic-lily-50eac6.netlify.app/","http://localhost:5173"],// your React frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.use(express.json());              // ⭐ MUST BE HERE
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/api", paymentRoutes);

app.listen(process.env.PORT || 4000, () => {
  console.log(`Server running on port ${process.env.PORT || 4000}`);
});

