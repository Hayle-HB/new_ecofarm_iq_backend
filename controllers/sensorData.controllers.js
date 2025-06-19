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

  // If a value is missing, set it to 'not readed'
  const newEntry = {
    timestamp: new Date().toISOString(),
    ph: ph !== undefined ? ph : "not readed",
    humidity: humidity !== undefined ? humidity : "not readed",
    temperature: temperature !== undefined ? temperature : "not readed",
    uv: uv !== undefined ? uv : "not readed",
    nitrogen: nitrogen !== undefined ? nitrogen : "not readed",
    phosphorus: phosphorus !== undefined ? phosphorus : "not readed",
    potassium: potassium !== undefined ? potassium : "not readed",
    waterLevel: waterLevel !== undefined ? waterLevel : "not readed",
    co2: co2 !== undefined ? co2 : "not readed",
    soilMoisture: soilMoisture !== undefined ? soilMoisture : "not readed",
    lightIntensity:
      lightIntensity !== undefined ? lightIntensity : "not readed",
    ec: ec !== undefined ? ec : "not readed",
    rainfall: rainfall !== undefined ? rainfall : "not readed",
    windSpeed: windSpeed !== undefined ? windSpeed : "not readed",
    leafWetness: leafWetness !== undefined ? leafWetness : "not readed",
  };

  let data = [];
  try {
    data = sensorDataService.readSensorData();
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
  data.push(newEntry);
  sensorDataService.writeSensorData(data);
  res.status(201).send("Sensor data added successfully.");
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
