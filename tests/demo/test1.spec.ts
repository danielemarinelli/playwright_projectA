import { test, expect } from "@playwright/test";
import constants_data from "../../data/constants.json";

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

test.only("Should demo constants type data", async ({ page, browserName }, testInfo) => {
    console.log(`>> Constant SUCCESS: ${JSON.stringify(constants_data.STATUSCODES.SUCCESS)}`);
    console.log(`>> Constant data: ${JSON.stringify(constants_data.STATUSCODES)}`);
});