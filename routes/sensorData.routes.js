const express = require("express");
const router = express.Router();
const sensorDataController = require("../controllers/sensorData.controllers");

// POST route to add sensor data
router.post("/sensor-data", sensorDataController.addSensorData);

// GET route to retrieve all sensor data
router.get("/sensor-data", sensorDataController.getAllSensorData);

module.exports = router;
