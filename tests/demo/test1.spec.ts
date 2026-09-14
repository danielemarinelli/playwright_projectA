import { test, expect } from "@playwright/test";
import constants_data from "../../data/constants.json";
import { log } from "../helpers/logger.js";

test("Should load home page with correct title", async ({ page }) => {
    // Go to the home page
    await page.goto("https://katalon-demo-cura.herokuapp.com/");

    // Assert if the title is correct
    await expect(page).toHaveTitle("CURA Healthcare Service");

    // Assert header text
    await expect(page.locator('//h1')).toHaveText('CURA Healthcare Service')
});


test("Should demo fixtures", async ({ page, browserName }, testInfo) => {
    console.log(`>> Test runs on ${browserName}`);
});

test("Should demo parallel execution first", {tag : '@demo'}, async ({ page, browserName }, testInfo) => {
    await page.goto("https://www.google.com");
});

test("Should demo parallel execution second", {tag : '@demo'}, async ({ page, browserName }, testInfo) => {
    await page.goto("https://www.ansa.it");
});

test("Should demo constants type data", async ({ page, browserName }, testInfo) => {
    console.log(`>> Constant SUCCESS: ${JSON.stringify(constants_data.STATUSCODES.SUCCESS)}`);
    console.log(`>> Constant data: ${JSON.stringify(constants_data.STATUSCODES)}`);
});

test.only("Should demo click action with PageObjects", async ({ page, browserName }, testInfo) => {
            // default action
        //await page.goto("https://katalon-demo-cura.herokuapp.com/");
        //await expect(page).toHaveTitle("CURA Healthcare Service");
        let ele = page.getByRole("link", { name: "Make Appointment" });
        //await ele.click();

        // Page Object action
        await page.goto("https://katalon-demo-cura.herokuapp.com/");
    
    try {
        await expect(ele).toBeVisible({ timeout: 10_000 }); // Custom timeout: Default - 5 seconds
        await ele.click();
    } catch (error) {
        await log("error", `Failed to click element: ${ele.toString()}, original error: ${error}`);
        throw error;
    }
});
