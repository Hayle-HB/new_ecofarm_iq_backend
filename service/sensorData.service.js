const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../data/SonsorData.json");

function readSensorData() {
  if (!fs.existsSync(dataFilePath)) return [];
  const fileContent = fs.readFileSync(dataFilePath, "utf8");
  if (!fileContent) return [];
  try {
    return JSON.parse(fileContent);
  } catch (e) {
    throw new Error("Corrupted data file.");
  }
}

function writeSensorData(data) {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

module.exports = {
  readSensorData,
  writeSensorData,
};
