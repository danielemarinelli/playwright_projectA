import { FullConfig } from "@playwright/test";
import { exec } from "child_process";
import { promisify } from "util";

const execPromise = promisify(exec);

export default async function globalTeardown(config: FullConfig) {
  /* Executed after all workers complete. Good place for cleanup tasks */
  console.log(`[INFO]: Starting the global teardown process ...`);

  // Generate Allure report for local runs and opens the report automatically in the default browser
  if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
    console.log(" >> Local run detected - starting Allure server...");

    try {
      // Generate the report first (optional, but recommended)
      console.log(" >> Generating Allure report...");
      await execPromise("allure generate ./allure-results --clean -o ./allure-report");
      
      // Then open it
      console.log(" >> Opening Allure report...");
      exec("allure open ./allure-report", (error, stdout, stderr) => {
        if (error) {
          console.error("ERROR: Opening Allure report:", error.message);
          return;
        }
        console.log(" >> Allure report opened successfully");
      });

      // Keep the process alive for a moment to allow the server to start
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.error("ERROR: Generating/Opening Allure report:", error);
    }
  }

  console.log(`[INFO]: Completed the global teardown process ...`);
}