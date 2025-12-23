import express from "express";
import EmployeeModel from "../Models/Employee.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const user = await EmployeeModel.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await EmployeeModel.findOne({ email });

  if (!user) return res.status(404).json("user not registered");
  if (user.password !== password)
    return res.status(401).json("password incorrect");

  res.json("success");
});

export default router;
