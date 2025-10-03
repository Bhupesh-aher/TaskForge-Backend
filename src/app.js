const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const boardRoutes = require("./routes/boardRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("DB connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);


app.get("/", (req, res) => {
  res.send("TaskForge Backend is running");
});

module.exports = app;
