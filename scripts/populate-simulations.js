const axios = require("axios");
require("dotenv").config();
const simulationsData = require("./mocks/simulations.json");

const STRAPI_URL = process.env.STRAPI_URL;
const API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_URL || !API_TOKEN) {
  console.error(
    "Error: STRAPI_URL and STRAPI_API_TOKEN must be set in .env file",
  );
  process.exit(1);
}

const api = axios.create({
  baseURL: STRAPI_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

async function createSimulation(simulationData) {
  try {
    const response = await api.post("/api/simulations", simulationData);
    console.log("Simulation created successfully:", response.data.data.id);
    return response.data.data.id;
  } catch (error) {
    console.error(
      "Error creating simulation:",
      JSON.stringify(error?.response?.data, null, 2),
    );
    throw error;
  }
}

async function main() {
  try {
    // Create all simulations from the JSON file
    const simulationIds = {};

    // Create each simulation and store its ID
    for (const [key, simulation] of Object.entries(simulationsData)) {
      const setId = await createSimulation(simulation);
      simulationIds[key] = setId;
      console.log(`Created ${key}:`, setId);
    }

    console.log("Successfully created all simulations!");
    console.log("Simulation IDs:", simulationIds);
  } catch (error) {
    console.error("Error:", JSON.stringify(error, null, 2));
  }
}

main();
