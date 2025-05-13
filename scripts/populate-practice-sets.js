const axios = require("axios");
const practiceSetsData = require("./mocks/practice-sets.json");
require("dotenv").config();

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

async function createPracticeSet(practiceSetData) {
  try {
    const payload = {
      data: practiceSetData,
    };

    const response = await api.post("/api/practice-sets", payload);
    console.log("Practice Set created successfully:", response.data.data.id);
    return response.data.data.id;
  } catch (error) {
    console.error(
      "Error creating practice set:",
      JSON.stringify(error?.response?.data, null, 2),
    );
    throw error;
  }
}

async function main() {
  try {
    // Create all practice sets from the JSON file
    const practiceSetIds = {};

    // Create each practice set and store its ID
    for (const [key, practiceSet] of Object.entries(practiceSetsData)) {
      const setId = await createPracticeSet(practiceSet);
      practiceSetIds[key] = setId;
      console.log(`Created ${key}:`, setId);
    }

    console.log("Successfully created all practice sets!");
    console.log("Practice Set IDs:", practiceSetIds);
  } catch (error) {
    console.error("Error:", JSON.stringify(error, null, 2));
  }
}

main();
