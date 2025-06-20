const express = require("express");
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Import and use sensor data routes
const sensorDataRoutes = require("./routes/sensorData.routes");
app.use("/api", sensorDataRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
