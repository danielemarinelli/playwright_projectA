import { type FullConfig } from "@playwright/test";
import path from "path";
import fs from "fs";
import process from "process";

export default async function globalSetup(config: FullConfig) {
    console.log(`[INFO]: Starting the global setup...`);

    if (process.env.RUNNER?.toUpperCase() === "LOCAL") {
        console.log(`[INFO]: Detecting local runs..`);
        // Delete allure results
        const resultsDir = path.resolve(process.cwd(), "allure-results");
        console.log(`>> resultsDir: ${resultsDir}`);

        if (fs.existsSync(resultsDir)) {  // Check if the allure-results directory exists
            fs.rmSync(resultsDir, { recursive: true, force: true });  // Delete the allure-results directory and its contents, this because we always want to see a fresh new allure report for local runs
            console.log(`[INFO]: Allure results deleted for local run`);
        }
    }
    console.log(`[INFO]: Completed the global setup...`);

    // All other one-off tasks go here...

    // Set the login cookie global variable
    process.env.LOGIN_COOKIES = undefined
}