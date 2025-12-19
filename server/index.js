require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

// Import QuickTask Routes
const hubRoutes = require('./routes/hubRoutes');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// 1. Database Connection
connectDB();

// 2. Middleware
app.use(express.json()); // Replaces body-parser (built-in since Express 4.16)
app.use(express.urlencoded({ extended: true }));

// 3. CORS Configuration (Simplified for Vercel/Dev)
app.use(cors({
  origin: "*", 
  methods: ["", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

// 4. Routes (QuickTask Specific)
app.get("/", (req, res) => {
  res.send("QuickTask API is Running"); // Simple health check
});

app.use('/api/hubs', hubRoutes);
app.use('/api/tasks', taskRoutes);

// 5. Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server Error", error: err.message });
});

// 6. Start Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));