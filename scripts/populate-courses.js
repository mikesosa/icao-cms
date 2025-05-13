const axios = require("axios");
require("dotenv").config();
const coursesData = require("./mocks/courses.json");

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

async function createCourse(courseData) {
  try {
    const payload = {
      data: {
        title: courseData.title,
        slug: courseData.slug,
        description: courseData.description,
        language: courseData.language,
        category: courseData.category,
        introMedia: courseData.introMedia,
        version: courseData.version,
        modules: courseData.modules,
      },
    };

    console.log("Sending payload:", JSON.stringify(payload, null, 2));

    const response = await api.post("/api/courses", payload);
    console.log("Course created successfully:", response.data.data.id);
    return response.data.data.id;
  } catch (error) {
    console.error(
      "Error creating course:",
      JSON.stringify(error?.response?.data, null, 2),
    );
    throw error;
  }
}

async function main() {
  try {
    // Create ELPAC Training Course
    const elpacCourseId = await createCourse(coursesData[0]);
    console.log("Created ELPAC Training Course:", elpacCourseId);

    // Create TEA Training Course
    const teaCourseId = await createCourse(coursesData[1]);
    console.log("Created TEA Training Course:", teaCourseId);

    console.log("Successfully created all courses!");
  } catch (error) {
    console.error("Error:", JSON.stringify(error, null, 2));
  }
}

main();
