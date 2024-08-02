const express = require("express");
const connectDB = require("./config/db"); // Import connectDB function
const authRoutes = require("./routes/auth");
const protectedRoutes = require("./routes/protected");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // Replace with your frontend's origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Adjust methods if necessary
    credentials: true,
  })
);
// Connect to MongoDB
connectDB(); // Call the connectDB function

// Middleware
app.use(express.json());

// Routes
app.use("/auth", authRoutes);
app.use("/protected", protectedRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
