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

    console.log("Sending payload:", JSON.stringify(payload, null, 2));

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
    // Create MCQ Practice Set
    const mcqSetId = await createPracticeSet(practiceSetsData.mcqPracticeSet);
    console.log("Created MCQ Practice Set:", mcqSetId);

    // Create Audio Practice Set
    const audioSetId = await createPracticeSet(
      practiceSetsData.audioPracticeSet,
    );
    console.log("Created Audio Practice Set:", audioSetId);

    // Create Text Practice Set
    const textSetId = await createPracticeSet(practiceSetsData.textPracticeSet);
    console.log("Created Text Practice Set:", textSetId);

    console.log("Successfully created all practice sets!");
  } catch (error) {
    console.error("Error:", JSON.stringify(error, null, 2));
  }
}

main();
