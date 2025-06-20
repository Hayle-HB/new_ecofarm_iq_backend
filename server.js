const express = require("express");
const app = express();
const path = require("path");

app.set("view engine", "ejs");
app.set("views", __dirname + "/docs");

// Middleware to parse JSON bodies
app.use(express.json());

// Import and use sensor data routes
const sensorDataRoutes = require("./routes/sensorData.routes");
app.use("/api", sensorDataRoutes);

// --- Live Message Broadcast (SSE) ---

const clients = [];
let lastMessage = null;

// SSE endpoint for readers
app.get("/events", (req, res) => {
  res.set({
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });
  res.flushHeaders();

  // Send the last message immediately if there is one
  if (lastMessage) {
    res.write(`data: ${lastMessage}\n\n`);
  }

  clients.push(res);

  req.on("close", () => {
    const idx = clients.indexOf(res);
    if (idx !== -1) clients.splice(idx, 1);
  });
});

// POST endpoint for owner to send a message
app.post("/send", express.text({ type: "*/*" }), (req, res) => {
  const message = req.body && req.body.trim();
  if (!message) {
    return res.status(400).send("Message required");
  }
  lastMessage = message;
  // Broadcast to all connected clients
  clients.forEach((client) => client.write(`data: ${message}\n\n`));
  res.status(200).send("Message sent");
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/owner", (req, res) => {
  res.render("owner");
});

app.get("/reader", (req, res) => {
  res.sendFile(path.join(__dirname, "reader.html"));
});

app.post("/api/test", (req, res) => {
  res.status(200).send(`It works you send a value ${req.body}`);
});

app.get("/api/test", (req, res) => {
  res
    .status(200)
    .send("Definitly We will go to GANA, no one will go except Us");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
