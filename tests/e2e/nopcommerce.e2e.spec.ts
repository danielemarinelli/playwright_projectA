import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger.js";
import HomePage from "../page-objects/nopcommerce.home.page.js";


test("Should login to nopCommerce app", async ({ page, }, testInfo) => {
    // Env config from test.playwright.config.ts
    const envConfig = testInfo.project.use as any;
    // create object of HomePage class
    const homePage = new HomePage(page);  
    // Login to nopCommerce app
    await homePage.loginToNopCommerceApp(
        envConfig.nopCommerceWeb, 
        process.env.NOP_COMMERCE_TEST_USERNAME, 
        process.env.NOP_COMMERCE_TEST_PASSWORD
    );
}); 