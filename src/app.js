const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const authRoutes = require("./routes/authRoutes");
const boardRoutes = require("./routes/boardRoutes");
const listRoutes = require("./routes/listRoutes");
const cardRoutes = require("./routes/cardRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const activityRoutes = require("./routes/activityRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

dotenv.config();

const app = express();

const isProd = process.env.NODE_ENV === "production";

// ✅ 1️⃣ Apply CORS at very top
app.use(
  cors({
    origin: isProd ? process.env.CLIENT_URL_PROD : process.env.CLIENT_URL_DEV, // your frontend
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ 2️⃣ Handle preflight (OPTIONS) requests
app.options("*", cors());

// ✅ 3️⃣ Then JSON parsing
app.use(express.json());

// ✅ 4️⃣ MongoDB connection
mongoose.connect(isProd ? process.env.MONGO_URI_PROD : process.env.MONGO_URI_DEV)
  .then(() => console.log(`✅ MongoDB connected to ${isProd ? "production" : "development"} database`))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ 5️⃣ Swagger + Routes
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/cards", cardRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/notifications", notificationRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("TaskForge Backend is running");
});

module.exports = app;
