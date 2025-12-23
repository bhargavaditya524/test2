import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import EmployeeModel from './Models/Employee.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: false
}));
app.use(express.json());

mongoose.connect(
  'mongodb+srv://bhargavaditya524_db_user:eUtivY26Ut7z616S@cluster0.zbvrmsm.mongodb.net/?appName=Cluster0'
)
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email })
    .then(user => {
      if (!user) return res.json("user not registered");
      if (user.password !== password) return res.json("password incorrect");
      res.json("success");
    });
});

app.post("/register", (req, res) => {
  EmployeeModel.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => res.status(500).json(err));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
