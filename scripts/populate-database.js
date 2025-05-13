const { spawn } = require("child_process");
const path = require("path");
require("dotenv").config();

const STRAPI_URL = process.env.STRAPI_URL;
const API_TOKEN = process.env.STRAPI_API_TOKEN;

if (!STRAPI_URL || !API_TOKEN) {
  console.error(
    "Error: STRAPI_URL and STRAPI_API_TOKEN must be set in .env file",
  );
  process.exit(1);
}

function runScript(scriptName) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, scriptName);
    const childProcess = spawn("node", [scriptPath], {
      stdio: "inherit",
      env: {
        ...process.env,
        STRAPI_URL,
        STRAPI_API_TOKEN: API_TOKEN,
      },
    });

    childProcess.on("close", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Script ${scriptName} exited with code ${code}`));
      }
    });

    childProcess.on("error", (err) => {
      reject(err);
    });
  });
}

async function main() {
  try {
    console.log("🚀 Starting database population...\n");

    console.log("📚 Creating practice sets...");
    await runScript("populate-practice-sets.js");
    console.log("✅ Practice sets created successfully!\n");

    console.log("🎮 Creating simulations...");
    await runScript("populate-simulations.js");
    console.log("✅ Simulations created successfully!\n");

    console.log("📖 Creating courses...");
    await runScript("populate-courses.js");
    console.log("✅ Courses created successfully!\n");

    console.log("🎉 Database population completed successfully!");
  } catch (error) {
    console.error("❌ Error during database population:", error.message);
    process.exit(1);
  }
}

main();
