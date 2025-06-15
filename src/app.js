const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

// 🌍 Load environment variables from .env file in the root directory
require('dotenv').config({ path: path.resolve(__dirname, './.env') });

// 🚀 Initialize app
const app = express();

// 🔧 Middleware
app.use(express.json());
app.use(cookieParser());

// 🛣️ API Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/posts", require("./routes/posts"));

// ❌ Handle undefined routes
app.all("*", (req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// 🧯 Global error handler middleware
app.use(errorHandler);

// 🔌 Connect to DB and Start Server
const PORT = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () =>
      console.log(`✅ Server is running on http://localhost:${PORT}`)
    );
  } catch (err) {
    console.error("❌ Server failed to start:", err.message);
    process.exit(1);
  }
};

startServer();