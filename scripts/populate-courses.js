const axios = require("axios");
const fs = require("fs").promises;

const STRAPI_URL = "http://127.0.0.1:1337";
const API_TOKEN =
  "ca553a55fa29422e56b8e969b6f873ed337303d724ad18a5fb83eb0f91a072f7847a9c243231ea7cee19b7b93aaa8f436c8d9b1b6c78e66a4f795480ee483cea4d6940895550fc050ce510dea077676660ea6a7021cae7a9ad6f2195afd5b0f3952b75a30ebf3cdb3536fe4b0c38e3a60fc0448a712958a836342cc779998a2f";

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
    const data = await fs.readFile("mock-course.json", "utf8");
    const courseData = JSON.parse(data);

    for (const course of courseData) {
      await createCourse(course);
    }
  } catch (error) {
    console.error("Error:", JSON.stringify(error, null, 2));
  }
}

main();
