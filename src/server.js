require("dotenv").config();
const express = require("express");
const path = require("path");
const fs = require("fs");
const db = require("./database/db");

const authRoutes = require("./api/routes/authRoutes");
const taskRoutes = require("./api/routes/taskRoutes");

const app = express();
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "frontend")));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

const port = process.env.PORT || 3000;

async function start() {
  try {
    // Load schema
    const schema = fs.readFileSync(
      path.join(__dirname, "database/schema.sql"),
      "utf8"
    );

    // Execute SQL
    await db.query(schema);

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
}

if (require.main === module) {
  start();
}

module.exports = app;
