const sensorDataService = require("../service/sensorData.service");

// Controller to handle POST request for sensor data
exports.addSensorData = (req, res) => {
  const {
    ph,
    humidity,
    temperature,
    uv,
    nitrogen,
    phosphorus,
    potassium,
    waterLevel,
    co2,
    soilMoisture,
    lightIntensity,
    ec,
    rainfall,
    windSpeed,
    leafWetness,
  } = req.body;

  if (
    ph === undefined ||
    humidity === undefined ||
    temperature === undefined ||
    uv === undefined ||
    nitrogen === undefined ||
    phosphorus === undefined ||
    potassium === undefined ||
    waterLevel === undefined
  ) {
    return res.status(400).json({ message: "Missing required sensor fields." });
  }

  const newEntry = {
    timestamp: new Date().toISOString(),
    ph,
    humidity,
    temperature,
    uv,
    nitrogen,
    phosphorus,
    potassium,
    waterLevel,
    co2,
    soilMoisture,
    lightIntensity,
    ec,
    rainfall,
    windSpeed,
    leafWetness,
  };

  let data = [];
  try {
    data = sensorDataService.readSensorData();
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
  data.push(newEntry);
  sensorDataService.writeSensorData(data);
  res
    .status(201)
    .send("Sensor data added successfully.");
};

// Controller to get all sensor data
exports.getAllSensorData = (req, res) => {
  let data = [];
  try {
    data = sensorDataService.readSensorData();
    res.json(data);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};
