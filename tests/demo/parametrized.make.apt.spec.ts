import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger.js";
import TestData from "../../data/test-data.js";

const makeApptTestData = TestData.makeAppointmentTestData() // -> Returns 3 objects of test data

//Access test data with the for of loop:
for (const apptData of makeApptTestData) {
    test.describe("Make Appointment",{annotation: {type: "functional",description: "US-xxx: Test to make an appointment"}}, () => {
        test.beforeEach("Login with valid creds", async ({ page }, testInfo) => {
            // 1. Launch URL and assert title and header

            // Get the URL from config file
            const envConfig = testInfo.project.use as any;

            // Custom logs
            await log("info", `Launching the web app in ${envConfig.envName}`)

            await page.goto("https://katalon-demo-cura.herokuapp.com/");
            await expect(page).toHaveTitle("CURA Healthcare Service");
            await expect(page.locator("//h1")).toHaveText("CURA Healthcare Service");

            // 2. Click on the Make Appointment
            await page.getByRole("link", { name: "Make Appointment" }).click();
            await expect(page.getByText("Please login to make")).toBeVisible();

            // Successful login
            await page.getByLabel("Username").fill("John Doe");
            await page.getByLabel("Password").fill("ThisIsNotAPassword");
            await page.getByRole("button", { name: "Login" }).click();

             // Get login cookies (handling DYNAMIC DATA)
            const loginCookies = await page.context().cookies()
            process.env.LOGIN_COOKIES = JSON.stringify(loginCookies)

            // Assert a text
            await expect(page.locator("h2")).toContainText("Make Appointment");
            await log("info", "The login is successful...")
        });


    test(`${apptData.testId}:Should make an appointment with non-default values`,{annotation: {type: "bug",description: "Defect: Test does not run in firefox"},tag:"@smoke"}, async ({ page }, testInfo) => {
        
         // Access the login cookies
        console.log(`>> Login cookies: ${process.env.LOGIN_COOKIES}`);
        // Dropdown
        await page.getByLabel("Facility").selectOption(apptData.facility);

        // Checkbox
        await page.getByText("Apply for hospital readmission").click();

        // Radio button
        await page.getByText(apptData.hcp).click();

        // Date input box
        await page.getByRole("textbox", { name: "Visit Date (Required)" }).click();
        await page.getByRole("textbox", { name: "Visit Date (Required)" }).fill(apptData.visitDt);
        await page.getByRole("textbox", { name: "Visit Date (Required)" }).press("Enter");

        // Multi-line comments input box
        await page.getByRole("textbox", { name: "Comment" }).click();
        await page.getByRole("textbox", { name: "Comment" }).fill(apptData.comment);

        // Button
        await page.getByRole("button", { name: "Book Appointment" }).click();

        // Assertion
        await expect(page.locator("h2")).toContainText("Appointment Confirmation");
        await expect(page.getByRole("link", { name: "Go to Homepage" })).toBeVisible();
    });


});
}