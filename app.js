const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT||3000;

// Middlewares
app.use(bodyParser.json());

// Database Connection
connectDB();

// Routes
app.get("/", (req, res) => {
    res.send("Bytive Assignment");
    });

app.use("/auth", authRoutes);

app.use("/tasks", taskRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start Server
app.listen(PORT, () =>
  console.log(`Server running on port: ${PORT}`)
);
