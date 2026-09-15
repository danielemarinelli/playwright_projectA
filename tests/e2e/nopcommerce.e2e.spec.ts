import { test, expect } from "@playwright/test";
import { log } from "../helpers/logger.js";
import HomePage from "../page-objects/nopcommerce.home.page.js";
import CustomerList from "../page-objects/nopcommerce.customer.list.page.js";

test.describe("nopCommerce E2E Customer Search", () => {

    test("TC001_E2E: Customer_Search", async ({ page, }, testInfo) => {
        // Env config from test.playwright.config.ts
        const envConfig = testInfo.project.use as any;
          
        // Login to nopCommerce app
        const homePage = new HomePage(page);
        await homePage.loginToNopCommerceApp(
            envConfig.nopCommerceWeb, 
            process.env.NOP_COMMERCE_TEST_USERNAME, 
            process.env.NOP_COMMERCE_TEST_PASSWORD
        );

        // Search for a customer
        let USER_DATA = {
            firstname: "Alex",
            lastname: "Thomas"
        }
        await log("info", `Searching for a customer with firstname: ${USER_DATA.firstname} and lastname: ${USER_DATA.lastname}...`);
        const customerListPage = new CustomerList(page);
        await customerListPage.goToCustomerListPage(`${envConfig.nopCommerceWeb}/Admin/Customer/List`);
        let customerNotFound = await customerListPage.searchAndConfirmUser(USER_DATA.firstname, USER_DATA.lastname);
        
        if (customerNotFound) {
            await log("warn", `Customer with firstname: ${USER_DATA.firstname} and lastname: ${USER_DATA.lastname} NOT found!!`);
        }else {
            await log("info", `Customer with firstname: ${USER_DATA.firstname} and lastname: ${USER_DATA.lastname} found!!`);
        }
    }); 
})